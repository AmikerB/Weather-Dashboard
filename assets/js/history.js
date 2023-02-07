
const historyBtns = $('#history');

let history = [];
let storedCities = localStorage.getItem("cityHistory");

function getHistory() {
    historyBtns.empty();
    // limit to 6 history searches
    history = history.slice(0, 6);
    // display history searches as buttons
    history.forEach(function (city) {
        const btn = $("<button>").text(city);
        btn.addClass("history-button");
        btn.attr("role", "button");
        historyBtns.append(btn);
    });
}

// if not equal to null 
if (storedCities !== null) {
    // parse JSON string stored in stored cities and assign to history
    history = JSON.parse(storedCities);
    // convert history into an array and removes duplicate values
    history = Array.from(new Set(history));
    getHistory();
}