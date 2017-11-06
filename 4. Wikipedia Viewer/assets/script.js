// wikiendpoint: https://en.wikipedia.org/w/api.php
// Add '?' after wikiendpoint to append parameters
// Use '&' to add additional parameters
// "action=query" to query

// "format=json" to specify the returned format
var wikiendpoint = "https://en.wikipedia.org/w/api.php?";
var url = wikiendpoint + "action=query&rvprop=content&format=json";
var result = document.getElementById("search-result")
var nbrSearch = 15;

document.getElementById('in-search').onkeypress = function(e) {
    var event = e || window.event;
    var charCode = event.which || event.keyCode;

    if ( charCode == '13' ) {
      // Enter pressed

      // Create a new request
      var xhr = new XMLHttpRequest();

      // Build URL for request - need input text value
      var str_search = document.getElementById("in-search").value;
      url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&generator=search&exsentences=2&exlimit=max&exintro=1&explaintext=1&excontinue=&gsrsearch="
            + str_search + "&gsrlimit=" + nbrSearch;
      // GET request
      xhr.open('GET', url, true);

      // make the request and get data
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
          // SUCCESS !
          // hide the paragraph in search-result
          document.getElementById("searchp").style.display = 'none';

          // get the responsetext and parse it to turn it into a JS object
          var reqResponse = xhr.responseText;
          data = JSON.parse(reqResponse);
          console.log(data.query);

          for(var pageID in data.query.pages) {
            var divEl = document.createElement("div");
            var paraEl = document.createElement("p");
            var anchorEl = document.createElement("a");
            var extract = document.createTextNode(data.query.pages[pageID].extract);

            paraEl.appendChild(extract);

            divEl.innerHTML = data.query.pages[pageID].title;
            divEl.appendChild(paraEl);
            anchorEl.appendChild(divEl);
            anchorEl.href = "https://en.wikipedia.org/?curid=" + pageID;
            anchorEl.target = "_blank";
            result.appendChild(anchorEl);
          }
        } else {
          // We reached our target server, but it returned an error
          result.innerHTML = "<p>Server reached. Error returned</p>";
        }
      };

      // If request returns an error
      xhr.onerror = function() {
        // There was a connection error of some sort
        result.innerHTML = "<p>Connection error</p>";
      };

      // send the request
      xhr.send();
    }
}
