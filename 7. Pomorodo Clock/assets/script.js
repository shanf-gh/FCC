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
var isRunning = false;

function toggleTimer() {
    var min = document.getElementById('timer-val-min');
    var sec = document.getElementById('timer-val-sec');
    
    if (isRunning) {
        isRunning = !isRunning;
        clearInterval(secInterval);
    } else {
        isRunning = !isRunning;
        var secInterval = setInterval(function() {
            var secVal = sec.innerHTML;

            // Decrement logics
            if (secVal === "00") {
                var minVal = min.innerHTML;
                if (minVal === "00") {
                    // Stop the clock
                    clearInterval(secInterval);
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
    console.log(isRunning);
}
