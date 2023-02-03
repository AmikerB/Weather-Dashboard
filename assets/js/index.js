
// display history seaches as buttons
// limit to 6 history searches  
const history = $('#history');

// function for todays forcast
function todaysForecast() {

    const citySearch = $('#search-input').val();

    const queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + citySearch + '&mode=json&units=metric&appid=647cd0964ccafc21b61d37e25926911b';



    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        const todaySection = $('#today');


        // City title
        const cityName = response.name;

        const todaysDate = moment().format('DD/MM/YYYY');

        const cityTitle = $("<h2>").text(cityName + " " + todaysDate);


        // temp 
        const todaysTemp = response.main.temp;

        const todaysTempSection = $("<h4>").text("Temperature: " + todaysTemp + "°C");


        // wind 
        const todaysWind = response.wind.speed;


        const todaysWindSection = $("<h4>").text("Wind: " + todaysWind + "m/s");

        //     // humidity
        const todaysHumidity = response.main.humidity;

        const todaysHumiditySection = $("<h4>").text("Humidity: " + todaysHumidity + "%");

        todaySection.append(cityTitle, todaysTempSection, todaysWindSection, todaysHumiditySection);

    })
}
//function for 5 day forecast 


// search for city 

$('#search-button').on('click', function (event) {

    event.preventDefault();

    todaysForecast();

    // todaySection.text(JSON.stringify(response));



});


// extra
 // const cityLon = response.coord.lon;

        // const cityLat = response.coord.lat;


        // const convertCityName = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&exclude={part}&appid=647cd0964ccafc21b61d37e25926911b'

        // console.log(convertCityName);