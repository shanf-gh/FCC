var x = document.getElementById("data");
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
  x.innerHTML = "Latitude: " + Math.round(position.coords.latitude) +
  "<br>Longitude: " + Math.round(position.coords.longitude);

  // Create a new request
  var request = new XMLHttpRequest();
  var getURL = 'https://fcc-weather-api.glitch.me/api/current?lat='+ lat +'&lon=' + lon;
  request.open('GET', getURL, true);

  //
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // SUCCESS !
      // Stringify the response from the server and then parse to create a JS object
      data = JSON.parse(request.responseText);
      y.innerHTML = data.weather[0].main;
      z.innerHTML = 'lat: ' + lat + '<br>lon: ' + lon;
      document.getElementById("loc_lon-lat").innerHTML = "longitude: " + data.coord.lon + "; lattitude: " + data.coord.lat;
      document.getElementById("loc").innerHTML = "Data name: " + data.name;
      document.getElementById("temp").innerHTML = "temperature: " + data.main.temp;
      document.getElementById("weather-main").innerHTML = "Weather param: " + data.weather[0].main;
      document.getElementById("weather-icon").innerHTML = "Weather icon: <img src=\"" + data.weather[0].icon + "\">";
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
