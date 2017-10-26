var x = document.getElementById("data");
var y = document.getElementById("message");
var z = document.getElementById("variable");

function getLocation () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    y.innerHTML = "Geolocalisation is not supported by this browser.";
  }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  x.innerHTML = "Latitude: " + Math.round(position.coords.latitude) +
  "<br>Longitude: " + Math.round(position.coords.longitude);

  var request = new XMLHttpRequest();
    var getURL = 'https://fcc-weather-api.glitch.me/api/current?lat='+ lat +'&lon=' + lon;
    request.open('GET', getURL, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // SUCCESS !
        var data = request.responseText;
        y.innerHTML = data;
        z.innerHTML = 'lat: ' + lat + '<br>lon: ' + lon;
      } else {
        // We reached our target server, but it returned an error
        y.innerHTML = "Server reached. Error returned";
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      y.innerHTML = "Connection error";
    };

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
