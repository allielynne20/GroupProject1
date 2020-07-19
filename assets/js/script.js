var searchEl = document.querySelector("#searchBtn");
var cityName = document.getElementById("cityname");

$("#searchBtn").on("click", function () {
    event.preventDefault();
    var cityName = $("#cityname").val();
    console.log(cityName);
    // cityName.value = "";
    saveCityBrew(cityName);
    saveCityEvent(cityName);
})


function saveCityBrew(cityName) {

    fetch(
        'https://api.openbrewerydb.org/breweries?by_city=' + cityName)
        .then(res => res.json())
        .then(function (data) {
            Brew(data);
        });
}


function Brew(data) {
    console.log(data)
    for (var i = 0; i < data.length; i++) {
        console.log(i);
        if (i < 10) {
            var brewEl = $('<div>').addClass("mainFood");
            var brewList = $('<p>').addClass("foodlist").text(data[i].name);
            brewEl.append(brewList);
            $("#callout1").append(brewEl);
        }
    }
}

// Fetch EventApi information
function saveCityEvent(cityName) {
    eventApi = 'https://app.ticketmaster.com/discovery/v2/events.json?city=' + cityName + '&size=10&apikey=iXIL7zyvzVd6feevOuPN5Kj5OiJTxxwp'

    fetch(eventApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            eventsToPage(data);
        });
};

// Format event info and add to page
function eventsToPage(data) {
    for (var i = 0; i < data._embedded.events.length; i++) {
        console.log(i);
        if (i < 10) {
            var eventEl = $('<div>').addClass("mainEvent");
            var eventList = $('<p>').addClass("eventlist").text(data._embedded.events[i].name);
            var eventDate = $('<p>').addClass("eventdate").text(data._embedded.events[i].dates.start.localDate);

            //add ticket info buttons
            ticketButtonId = ("ticketButton" + [i]);
            var ticketInfo = $('<button>').addClass("button").text("Buy Tickets").attr("onclick", "window.location.href='" + (data._embedded.events[i].url) + "';");


            // Append elements to eventEl
            eventEl.append(eventList);
            eventEl.append(eventDate);
            eventEl.append(ticketInfo);
            $("#callout2").append(eventEl);
        };
    };
};
