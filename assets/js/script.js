var searchEl = document.querySelector("#searchBtn")

function saveName () {
var cityName = document.getElementById("cityname").value;

fetch(
    'https://api.openbrewerydb.org/breweries?by_city=' + cityName)
    .then(res => res.json())
    .then(function(data) {
        Brew(data);
    }
   )
  }

function Brew (data) {
    console.log(data)
}

searchEl.addEventListener("click",saveName)