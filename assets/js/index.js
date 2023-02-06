
// display history seaches as buttons
// limit to 6 history searches  
const history = $('#history');

function weather(section, response) {
    const weatherIcon = response.weather[0].icon;
    const todaysWeatherIcon = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
    const createImgTag = $("<img>");
    createImgTag.attr("src", todaysWeatherIcon);
    createImgTag.attr("alt", "weather icon");

    const cityName = response.name;
    const todaysDate = moment().format('DD/MM/YYYY');
    const cityTitle = $("<h2>").text(`${cityName} ${todaysDate}`);

    const todaysTemp = response.main.temp;
    const todaysTempSection = $("<h4>").text(`Temperature: ${todaysTemp}°C`);

    const todaysWind = response.wind.speed;
    const todaysWindSection = $("<h4>").text(`Wind: ${todaysWind} KPH`);

    const todaysHumidity = response.main.humidity;
    const todaysHumiditySection = $("<h4>").text(`Humidity: ${todaysHumidity}%`);

    section.empty().append(cityTitle, createImgTag, todaysTempSection, todaysWindSection, todaysHumiditySection);
}

// function for todays forcast
function todaysForecast() {
    const citySearch = $('#search-input').val();

    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${citySearch}&mode=json&units=metric&appid=647cd0964ccafc21b61d37e25926911b`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        const todaySection = $('#today');
        weather(todaySection, response);
    }).catch(function (error) {
        console.error(error);
        alert("No results found for the given city");
    });
}


// function for 5 day forecast 
function fiveDayForecast() {

    const citySearch = $('#search-input').val();

    const queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&appid=647cd0964ccafc21b61d37e25926911b' + '&cnt=40';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        const forecastSection = $('#forecast');
        const middayList = response.list.filter(obj => obj.dt_txt.endsWith("12:00:00"));

        middayList.forEach(obj => {
            console.log(obj);

            const newDiv = $("<div>").text(obj);
            forecastSection.append(newDiv);
            // day of the week
            const date = obj.dt_txt.split(" ");
            const dateOnly = date[0];
            const dayOfWeek = moment(dateOnly).format('dddd');

            // weather for each day
            const weatherIcon = obj.weather[0].icon;
            const todaysWeatherIcon = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
            const createImgTag = $("<img>");
            createImgTag.attr("src", todaysWeatherIcon);
            createImgTag.attr("alt", "weather icon");

            const cityTitle = $("<h5>").text(`${dayOfWeek}`);

            const todaysTemp = obj.main.temp;
            const todaysTempSection = $("<h6>").text(`Temperature: ${todaysTemp}°C`);

            const todaysWind = obj.wind.speed;
            const todaysWindSection = $("<h6>").text(`Wind: ${todaysWind} KPH`);

            const todaysHumidity = obj.main.humidity;
            const todaysHumiditySection = $("<h6>").text(`Humidity: ${todaysHumidity}%`);

            newDiv.empty().append(cityTitle, createImgTag, todaysTempSection, todaysWindSection, todaysHumiditySection);




        });

        //     let card = document.createElement("div");
        //     card.style.width = "200px";
        //     card.style.height = "300px";
        //     card.style.backgroundColor = "lightblue";
        //     card.style.margin = "10px";
        //     card.innerHTML = arr[i];

        //     forecastSection.append(card);
    })
}

// search for city 

$('#search-button').on('click', function (event) {

    event.preventDefault();

    todaysForecast();

    fiveDayForecast();


});
