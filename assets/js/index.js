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
function todaysForecast(citySearch) {

    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${citySearch}&mode=json&units=metric&appid=647cd0964ccafc21b61d37e25926911b`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        const cityName = response.name;
        const todaysDate = moment().format('DD/MM/YYYY');
        const cityTitle = $("<h2>").text(`${cityName} ${todaysDate}`)

        const todaySection = $('#today');

        todaySection.addClass('todaySection');

        weather(todaySection, response, cityTitle);
        // only save to local storage if city isn't already there 
        if (!history.includes(cityName)) {
            // adds city to index 0 of history array 
            history.unshift(cityName);
            // save to local storage
            localStorage.setItem("cityHistory", JSON.stringify(history));

            getHistory();
        }

    }).catch(function (error) {
        console.error(error);
        alert("No results found for the given city");
        // clears input
        $('#search-input').val("");
    });
}

// function for 5 day forecast 
function fiveDayForecast(citySearch) {
    const forecastHeader = $('.forecast-title')

    forecastHeader.empty();
    const forecastTitle = '5 Day Forecast:';
    forecastHeader.append(forecastTitle);

    const queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&units=metric&appid=647cd0964ccafc21b61d37e25926911b' + '&cnt=40';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        const forecastSection = $('#forecast');
        // selecting to display the weather at 12 noon 
        const middayList = response.list.filter(obj => obj.dt_txt.endsWith("12:00:00"));

        forecastSection.empty();

        middayList.forEach(obj => {
            // creating new div for each and styling them
            const newDiv = $("<div>").text(obj)

            newDiv.addClass('forecastDivs');

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

$('#search-button').on('click', function (event) {

    event.preventDefault();

    const cityInput = $('#search-input').val();

    todaysForecast(cityInput);

    fiveDayForecast(cityInput);

});


historyBtns.on('click', $('button'), function (event) {
    event.preventDefault();
    const cityBtn = event.target.textContent;
    todaysForecast(cityBtn);
    fiveDayForecast(cityBtn);
})

