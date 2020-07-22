var searchEl = document.querySelector("#searchBtn");
var cityName = document.getElementById("cityname");
var callout1 = document.getElementById("callout1")

$("#searchBtn").on("click", function () {
    event.preventDefault();
    var cityName = $("#cityname").val();
    console.log(cityName);

    saveCityBrew(cityName);
    saveCityEvent(cityName);

    cityName.value = "";
})

// Fetch BrewApi information
function saveCityBrew(cityName) {

    fetch(
        'https://api.openbrewerydb.org/breweries?by_city=' + cityName)
        .then(res => res.json())
        .then(function (data) {
            //locally store data for future email form
            localStorage.setItem('brewresults', data.length);
            Brew(data);
        });
}

// Format brew info and add to page
function Brew(data) {
    console.log(data)
    callout1.innerHTML = "";
    for (var i = 0; i < 10; i++) {
        console.log(i);

        if (i < 10) {
            var brewEl = $('<div>').addClass("mainFood");
            var brewName = $('<p>').addClass("foodlist").text(data[i].name);
            var brewStreet = $('<p>').addClass("foodstreet").text((data[i].street) + ", " + (data[i].city));
            var brewSite = $('<a>').addClass("foodsite").attr('href', data[i].website_url).text(data[i].website_url);
            //alter to make it a hyperlink
            var brewPhone = $('<p>').addClass("foodphone tel").text(data[i].phone);
            //this formats the phone number into 000-000-0000
            $(brewPhone).text(function(i, text) {
                text = text.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
                return text;
            });
            //alter to make it in correct format
            brewEl.append(brewName);
            brewEl.append(brewStreet);
            brewEl.append(brewPhone);
            brewEl.append(brewSite);
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
            //locally store data for future email form 
            localStorage.setItem('eventresults', data.length);
            eventsToPage(data);
        });
};

// Format event info and add to page
function eventsToPage(data) {
    callout2.innerHTML = "";
    for (var i = 0; i < data._embedded.events.length; i++) {
        console.log(i);
        if (i < 10) {
            var eventEl = $('<div>').addClass("mainEvent");
            var eventList = $('<p>').addClass("eventlist").text(data._embedded.events[i].name);
            var eventDate = $('<p>').addClass("eventdate").text('Event Date: ' + data._embedded.events[i].dates.start.localDate);
            var ticketImg = $('<img>').addClass('ticketicon').attr('src', './assets/images/ticketicon.png');
            //add ticket info buttons
            ticketButtonId = ("ticketButton" + [i]);
            var ticketInfo = $('<button>').addClass("eventbutton").attr("onclick", "window.location.href='" + (data._embedded.events[i].url) + "';");
            ticketInfo.append(ticketImg)
            // Append elements to eventEl
            eventEl.append(eventList);
            eventEl.append(eventDate);
            eventEl.append(ticketInfo);
            $("#callout2").append(eventEl);
        };
    };
};

