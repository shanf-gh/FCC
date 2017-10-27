
// divs to be populated
// If uncomment verify all related element
// var lon_lat = document.getElementById("loc_lon-lat");
var loc = document.getElementById("loc");
var temp = document.getElementById("temp");
var weather = document.getElementById("weather-main");
var weather_icon = document.getElementById("weather-icon");
var y = document.getElementById("message");
var z = document.getElementById("variable");
var data;

// Function to get the current location's information
function getLocation () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    y.innerHTML = "Geolocalisation is not supported by this browser.";
  }
}


function showPosition(position) {
  // get lattitude and longitude
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  // output lattiude and longitude to html
  // Create a new request
  var request = new XMLHttpRequest();
  var getURL = 'https://fcc-weather-api.glitch.me/api/current?lat='+ lat +'&lon=' + lon;
  request.open('GET', getURL, true);

  //
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // SUCCESS !
      // Stringify the response from the server and then parse to create a JS object
      var reqResponse = request.responseText;
      data = JSON.parse(reqResponse);
      y.innerHTML = reqResponse;
      // if uncomment - uncomment related html div
      // lon_lat.innerHTML = "lon: " + data.coord.lon + " lat: " + data.coord.lat;
      loc.innerHTML = data.name + ", " + data.sys.country;
      // Character for Celcius &#8451; - for fahrenheit &#8457;
      temp.innerHTML =  Math.round(data.main.temp * 10) / 10 + " &#8451;";

      weather.innerHTML = data.weather[0].main;
      weather_icon.innerHTML = "<img src=\"" + data.weather[0].icon + "\">";
      /**/
    } else {
      // We reached our target server, but it returned an error
      y.innerHTML = "Server reached. Error returned";
    }
  };

  // If request returns an error
  request.onerror = function() {
    // There was a connection error of some sort
    y.innerHTML = "Connection error";
  };

  // send the request
  request.send();

}

/*
// Runs only if the HTML is fully loaaded
$(document).ready(function(){
  // click event handled on .curLoc
  $(".curLoc").on("click", function(){
    // Modify the html in the elements with .message class
    $(".message").html("Here is the message");

  });
});
*/
