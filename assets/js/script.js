var searchEl = document.querySelector("#searchBtn");
var cityName = document.getElementById("cityname");

$("#searchBtn").on("click", function() {
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
    for(var i=0; i < data.length; i++) {
        console.log(i);
        if (i < 10) {
            var brewEl = $('<div>').addClass("mainFood");
            var brewList = $('<p>').addClass("foodlist").text(data[i].name);
            brewEl.append(brewList);
            $("#callout1").append(brewEl);
        }
    }
}


function saveCityEvent(cityName) {

    // var cityName = document.getElementById("cityname").value;

    var events = 'https://app.ticketmaster.com/discovery/v2/events.json?city=' + cityName + '&size=1&apikey=iXIL7zyvzVd6feevOuPN5Kj5OiJTxxwp';

    $.ajax({
        type: "GET",
        url: events,
        async: true,
        dataType: "json",
        success: function (response) {
            console.log(response);
            console.log(response._embedded.events[0].url);
            // Parse the response.
            var eventEl = $('<div>').addClass("mainEvent");
            var eventList = $('<p>').addClass("eventlist").text(response._embedded.events[0].name);
            var eventURL = $('<a>').addClass("eventURL").attr('href', response._embedded.events[0].url).text(response._embedded.events[0].url);
            // Do other things.
            eventList.append(eventURL);
            eventEl.append(eventList);
            $("#callout2").append(eventEl);
        },
        // error: function (xhr, status, err) {
        //     // This time, we do not end up here!
        // }
    });
}

// searchEl.addEventListener("click", saveCityBrew)
// searchEl.addEventListener("click", saveCityEvent)