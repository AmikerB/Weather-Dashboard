
// display history seaches as buttons
// limit to 6 history searches  
const history = $('#history');

// function for todays forcast
function todaysForecast() {

    const citySearch = $('#search-input').val();

    // add to local storage THIS DOESNT WORK :(
    const cityArray = [];

    if (localStorage.getItem("cityName")) {
        cityArray = JSON.parse(localStorage.getItem("cityName"));
    }


    cityArray.push(citySearch);

    localStorage.setItem("cityName", JSON.stringify(cityArray));



    // 
    const queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + citySearch + '&mode=json&units=metric&appid=647cd0964ccafc21b61d37e25926911b';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        const todaySection = $('#today');


        // weather icon 
        const weatherIcon = response.weather[0].icon;

        const todaysWeatherIcon = "http://openweathermap.org/img/wn/" + weatherIcon + ".png";

        const createImgTag = $("<img>");

        createImgTag.attr("src", todaysWeatherIcon);
        createImgTag.attr("alt", "weather icon");


        // City title
        const cityName = response.name;

        const todaysDate = moment().format('DD/MM/YYYY');

        const cityTitle = $("<h2>").text(cityName + " " + todaysDate);


        // temp 
        const todaysTemp = response.main.temp;

        const todaysTempSection = $("<h4>").text("Temperature: " + todaysTemp + "°C");


        // wind 
        const todaysWind = response.wind.speed;

        const todaysWindSection = $("<h4>").text("Wind: " + todaysWind + "KPH");



        // humidity
        const todaysHumidity = response.main.humidity;

        const todaysHumiditySection = $("<h4>").text("Humidity: " + todaysHumidity + "%");

        todaySection.append(cityTitle, createImgTag, todaysTempSection, todaysWindSection, todaysHumiditySection);


    })



}


// function for 5 day forecast 
function fiveDayForecast() {

    const citySearch = $('#search-input').val();

    const queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&appid=647cd0964ccafc21b61d37e25926911b' + '&cnt=40';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        forecastSection = $('#forcast');

        // find average temp for each day 
        // display in cards undeneath title which says 5 day forecast
    })

    //     let card = document.createElement("div");
    //     card.style.width = "200px";
    //     card.style.height = "300px";
    //     card.style.backgroundColor = "lightblue";
    //     card.style.margin = "10px";
    //     card.innerHTML = arr[i];

    //     forecastSection.append(card);

}

// search for city 

$('#search-button').on('click', function (event) {

    event.preventDefault();

    todaysForecast();

    fiveDayForecast();


});
