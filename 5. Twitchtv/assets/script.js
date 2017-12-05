

window.onload = function() {
  // document elements
  var results = document.getElementById("results");

  // users array
  var users = ["test_channel","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
              "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","dahmien7"]


  // define endpoints
  var endpoint_s = "https://wind-bow.glitch.me/twitch-api/streams/";
  var endpoint_c = "https://wind-bow.glitch.me/twitch-api/channels/";



  function doAjax() {
    for (var i = 0, n = users.length; i < n; i++) {
      getData('stream',users[i]);
    }
  }

  function processData(data, user) {
    /* stream status */
    if (data.stream === null) {
      /* Stream is offline */
      getData('channel', user);
    } else {
      if (!data.hasOwnProperty('logo')) {
        data = data.stream.channel;
        var stat_sign = '&#10004;';
        var stat_color = 'green';
        var line_status = 'online';
      } else {
        var stat_sign = '&#10006;';
        var stat_color = 'red';
        var line_status = 'offline';
      }

      /* icon */
      var logo = document.createElement('img');
      logo.src = data.logo;
      var icon = document.createElement('div');
      icon.className = 'icon';
      icon.appendChild(logo);

      /* name & status */
      var name = document.createElement('p');
      name.innerHTML = data.display_name;
      var c_status = document.createElement('p');
      c_status.className = 'c_status';
      c_status.innerHTML = data.status;
      var name_status = document.createElement('div');
      name_status.appendChild(name);
      name_status.appendChild(c_status);

      /* Online/Offline */
      var s_status = document.createElement('div');
      s_status.className = 's_status';
      s_status.style.color = stat_color;
      s_status.innerHTML = stat_sign;

      /* appending to results */
      var row = document.createElement('div');
      row.className = 'row ' + line_status;
      row.appendChild(icon);
      row.appendChild(name_status);
      row.appendChild(s_status);
      results.appendChild(row);
    }
  }

  function getData(type, user) {
    if (type === 'channel') {
      var url = endpoint_c + user;
    } else if (type === 'stream') {
      var url = endpoint_s + user;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        data = JSON.parse(this.responseText);
        processData(data,user);
      } else {
        console.log("Server reached. Error returned for " + user);
      }
    }
    xhr.onerror = function() {
      // There was a connection error of some sort
      // Connection error
      console.log("Connection error for " + users[i]);
    };
    xhr.send();
  }

  doAjax();
}

/* Online filter */
/* Disable link's default behavior */
var menu_links = document.getElementById('status').getElementsByTagName('a');

for (var i = 0, n = menu_links.length; i < n; i++) {
  menu_links[i].addEventListener('click', function(e){e.preventDefault();});
}

// select elements: document.querySelectorAll(".example")
// visibility of element: document.getElementById("myP").style.visibility = "hidden";
var stream_on = results.getElementsByClassName('online');
var stream_off = results.getElementsByClassName('offline');



// Have a look for asynchronous requests:
// https://stackoverflow.com/questions/5485495/how-can-i-take-advantage-of-callback-functions-for-asynchronous-xmlhttprequest
// have a look at cjustom events: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
/*
function GetData(url, callback) {
  var xhr = new XMLHttpRequest;

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {

    }
  }

  xhr.open("GET", url);
  xhr.send(null);
}
*/
