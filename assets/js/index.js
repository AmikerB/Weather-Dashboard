// display history seaches as buttons
// limit to 6 history searches  
const historyBtns = $('#history');

let history = [];

function getHistory() {
    let storedCities = localStorage.getItem("cityHistory");
    let history = [];

    if (storedCities !== null) {
        history = JSON.parse(storedCities);

        // Remove duplicate cities
        history = Array.from(new Set(history));

        history.forEach(function (city) {
            const btn = $("<button>").text(city);
            historyBtns.append(btn);
        });
    }
}




function weather(section, response, sectionTitle) {
    const weatherIcon = response.weather[0].icon;
    const todaysWeatherIcon = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
    const createImgTag = $("<img>");
    createImgTag.attr("src", todaysWeatherIcon);
    createImgTag.attr("alt", "weather icon");

    const todaysTemp = response.main.temp;
    const todaysTempSection = $("<h4>").text(`Temp: ${todaysTemp}°C`);

    const todaysWind = response.wind.speed;
    const todaysWindSection = $("<h4>").text(`Wind: ${todaysWind} KPH`);

    const todaysHumidity = response.main.humidity;
    const todaysHumiditySection = $("<h4>").text(`Humidity: ${todaysHumidity}%`);

    section.empty().append(sectionTitle, createImgTag, todaysTempSection, todaysWindSection, todaysHumiditySection);
}

// function for todays forcast
function todaysForecast() {
    const citySearch = $('#search-input').val();

    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${citySearch}&mode=json&units=metric&appid=647cd0964ccafc21b61d37e25926911b`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        const cityName = response.name;
        const todaysDate = moment().format('DD/MM/YYYY');
        const cityTitle = $("<h2>").text(`${cityName} ${todaysDate}`);
        const todaySection = $('#today');
        weather(todaySection, response, cityTitle);

        // push to histroy array
        history.push(cityName);
        // save to local storage 
        localStorage.setItem("cityHistory", JSON.stringify(history));

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
        const forecastSection = $('#forecast');
        // selecting to display the weather at 12 noon 
        const middayList = response.list.filter(obj => obj.dt_txt.endsWith("12:00:00"));

        middayList.forEach(obj => {
            // creating new div for each and styling them
            const newDiv = $("<div>").text(obj).css({
                width: '200px',
                height: '300px',
                background: 'lightblue',
                margin: '3px',
                padding: '3px',
            });

            forecastSection.append(newDiv);

            // day of the week
            const date = obj.dt_txt.split(" ");
            // selecting only the date
            const dateOnly = date[0];
            // converting to day of the week
            const dayOfWeek = moment(dateOnly).format('dddd');
            // title of the new div
            const title = $("<h3>").text(`${dayOfWeek}`);

            // passing into weather funcition to display each days weather
            weather(newDiv, obj, title);
        });
    })
}


getHistory();

$('#search-button').on('click', function (event) {

    event.preventDefault();

    todaysForecast();

    fiveDayForecast();

});


historyBtns.on('click', $('button'), function (event) {
    event.preventDefault();

    console.log(event.target.textContent);




})
