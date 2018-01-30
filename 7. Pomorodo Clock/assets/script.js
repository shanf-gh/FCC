function decreaseVal(id) {
    var display = document.getElementById(id);
    var currVal = parseInt(display.innerHTML);

    // Increase the length of id
    if (currVal > 0) display.innerHTML = currVal - 1;

    // Increase the value of the session length
    if (id === 'session-value') {
        document.getElementById('timer-val-min').innerHTML = currVal - 1;
        document.getElementById('timer-val-sec').innerHTML = '00';
    }
}

function increaseVal(id) {
    var display = document.getElementById(id);
    var currVal = parseInt(display.innerHTML);
    
    // Increase the length of id
    display.innerHTML = currVal + 1;
    
    // Increase the value of the session length
    if (id === 'session-value') {
        document.getElementById('timer-val-min').innerHTML = currVal + 1;
        document.getElementById('timer-val-sec').innerHTML = '00';
    }
}

// set switch variables
var isRunning = false;
var nextBreak = false;
// secInterval needs to be declared outside the function toggleTimer 
// otherwise will create a new var for every click and won't be able
// to properly clearInterval on it
var secInterval;

function toggleTimer() {
    var min = document.getElementById('timer-val-min');
    var sec = document.getElementById('timer-val-sec');
    nextBreak = !nextBreak;
    console.log('toggled');
    if (isRunning) {
        isRunning = !isRunning;
        clearInterval(secInterval);
    } else {
        isRunning = !isRunning;
        secInterval = setInterval(function() {
            var secVal = sec.innerHTML;

            // Decrement logics
            if (secVal === "00") {
                var minVal = min.innerHTML;
                if (minVal === "00") {
                    // Stop the clock
                    clearInterval(secInterval);
                    // Switch the value
                    var id = nextBreak ? 'break-value' : 'session-value';
                    console.log("next is break: " + nextBreak + "; id: " + id)
                    // reset variables
                    isRunning = !isRunning;
                    console.log("next is break: " + nextBreak);
                    min.innerHTML = ('0' + document.getElementById(id).innerHTML).slice(-2);
                    toggleTimer();
                } else {
                    // Decrease the minutes
                    minVal -= 1;
                    min.innerHTML = ('0' + minVal).slice(-2);
                    // Reset seconds
                    sec.innerHTML = 59;
                }
            } else {
                // Decrease the seconds
                secVal -= 1;
                sec.innerHTML = ('0' + secVal).slice(-2);
            }
        }, 1000);
    }
}