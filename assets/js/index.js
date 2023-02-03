
$('#search-button').on('click', function (event) {

    event.preventDefault();

    const citySearch = $('#search-input').val();

    const queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&mode=xml&appid=647cd0964ccafc21b61d37e25926911b';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        const todaySection = $('#today');

        const cityName = response.getElementsByTagName("name")[0].textContent;

        const todaysDate = moment().format('DD/MM/YYYY');

        const h2 = $("<h2>").text(cityName + " " + todaysDate);

        todaySection.append(h2);


        // todaySection.text(JSON.stringify(response));



    });

})



