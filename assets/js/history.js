// display history seaches as buttons
// limit to 6 history searches

const historyBtns = $('#history');

let history = [];
let storedCities = localStorage.getItem("cityHistory");

function getHistory() {
    historyBtns.empty();

    history = history.slice(0, 6);

    history.forEach(function (city) {
        const btn = $("<button>").text(city);
        btn.addClass("history-button");
        btn.attr("role", "button");
        historyBtns.append(btn);
    });
}

if (storedCities !== null) {
    history = JSON.parse(storedCities);
    history = Array.from(new Set(history));
    getHistory();
}