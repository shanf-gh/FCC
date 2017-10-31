
// divs to be populated
var loc = document.getElementById("loc");
var tempV = document.getElementById("tempV");
var tempM = document.getElementById("tempM");
var weather = document.getElementById("weather-main");
var weather_icon = document.getElementById("weather-icon");
var data;

// Geolocation on page load
window.onload = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      y.innerHTML = "Geolocalisation is not supported by this browser.";
    }
}

// Change temperature when clicking on the temperature's measure
document.getElementById("tempM").onclick = function() {
  // Get temperature value and measure
  var tempVal = tempV.innerText.substring(0, tempV.innerText.length-2);
  var tempMea = tempM.innerText;

  // Apply formula and measure change based on current measure
  if(tempMea === "C") {
    tempVal = tempVal * 9 / 5 + 32;
    tempV.innerHTML = Math.round(tempVal * 10) / 10 + " &#176;";
    tempM.innerHTML = "F";
  } else if (tempMea === "F") {
    tempVal = (tempVal - 32) * 5 / 9;
    tempV.innerHTML = Math.round(tempVal * 10) / 10 + " &#176;";
    tempM.innerHTML = "C";
  }
};

// Show position
function showPosition(position) {
  // get lattitude and longitude
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  // Create a new request
  var request = new XMLHttpRequest();
  // Build URL for request - need latttitude and longitude
  var getURL = 'https://fcc-weather-api.glitch.me/api/current?lat='+ lat +'&lon=' + lon;
  // GET request
  request.open('GET', getURL, true);

  // make the request and get data
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // SUCCESS !
      // get the responsetext and parse it to turn it into a JS object
      var reqResponse = request.responseText;
      data = JSON.parse(reqResponse);
      console.log(data);
      // var icon = "http://openweathermap.org/img/w/"+ data.weather[1].icon +".png";
      var icon = data.weather[0].icon;
      loc.innerHTML = data.name + ", " + data.sys.country;
      // Character for degree &#176;
      tempV.innerHTML =  Math.round(data.main.temp * 10) / 10 + " &#176;";
      tempM.innerHTML = "C";
      weather.innerHTML = data.weather[0].main;
      weather_icon.innerHTML = "<img src=\"" + icon + "\">";

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
