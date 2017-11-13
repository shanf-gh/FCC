

window.onload = function() {
  // Document elements
  var results = document.getElementById("results");

  // users array
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
              "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
  // xhr variables
  var xhr = new XMLHttpRequest();
  var endpoint = "https://wind-bow.glitch.me/twitch-api/channels/";

  // set an iterator to 0, define a function that make an xhr request and take a callback ,
  // call that function, check the iterator against your array length,
  // inside the callback increment the iterator and call the function again

  for (var i = 0, n = users.length; i < n; i++) {
    var url = endpoint + users[i];

/*
    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        var data = JSON.parse(this.response);

        var img = document.createElement("img");
        img.src = data.logo;
        results.appendChild(img);
      } else {
        // We reached our target server, but it returned an error
        results.innerHTML =  "<p>Server reached. Error returned</p>";
      }
    };

    xhr.onerror = function() {
      // There was a connection error of some sort
      results.innerHTML = "<p>Connection error</p>";
    };

    xhr.send();
  }
*/
}

// Have a look for asynchronous requests:
// https://stackoverflow.com/questions/5485495/how-can-i-take-advantage-of-callback-functions-for-asynchronous-xmlhttprequest
// have a look at cjustom events: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent

function GetData(url, callback) {
  var xhr = new XMLHttpRequest;

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {

    }
  }

  xhr.open("GET", url);
  xhr.send(null);
}
