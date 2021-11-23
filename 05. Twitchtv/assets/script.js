

window.onload = function() {
  // document elements
  var results = document.getElementById("results");

  // users array
  var users = ["test_channel","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
              "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","dahmien7"]


  // define endpoints
  var endpoint_s = "https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/";
  var endpoint_c = "https://twitch-proxy.freecodecamp.rocks/twitch-api/channels/";



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
      var name_link = document.createElement('a');
      name_link.innerHTML = data.display_name;
      name_link.setAttribute('href',data.url);
      name.appendChild(name_link);
      var c_status = document.createElement('p');
      c_status.className = 'c_status';
      // Get status text and trim it if too long
      var c_status_text = data.status;
      if (c_status_text && c_status_text.length > 60) {
        c_status_text = c_status_text.split(' ').reduce(function(ts, s2) {
          if((ts + " " +  s2).length < 60) {
            return ts + " " + s2;
          }
          return ts;
        }, "") + "...";
      }
      c_status.innerHTML = c_status_text;
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
      row.className = 'row';
      row.appendChild(icon);
      row.appendChild(name_status);
      row.appendChild(s_status);
      var block = document.createElement('div');
      block.className = line_status;
      block.appendChild(row);
      results.appendChild(block);
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
var arrows = document.getElementById('arrows').getElementsByTagName('div');

// Display all channels and its arrow
document.getElementById('btn_all').addEventListener('click', function() {
  displayIt('block','block','all');
});
// Display online channels and its arrow
document.getElementById('btn_online').addEventListener('click', function() {
  displayIt('block','none','online');
});
// Display offline channels and its arrow
document.getElementById('btn_offline').addEventListener('click', function() {
  displayIt('none','block','offline');
});


function displayArrow(element) {
  for (var arrow of arrows) {
    arrow.style.display = "none";
  }
  document.getElementById(element).style.display = 'block';
}

function displayIt(onDisplay, offDisplay, status) {
  for(var i = 0, n = stream_on.length; i < n; i++) {
    stream_on[i].style.display = onDisplay;
  }
  for(var i = 0, n = stream_off.length; i < n; i++) {
    stream_off[i].style.display = offDisplay;
  }
  displayArrow(status);
}
