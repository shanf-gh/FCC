// set switch variables
var isRunning = false;
var nextBreak = false;
var sessionCount = 0;
// secInterval needs to be declared outside the function toggleTimer 
// otherwise will create a new var for every click and won't be able
// to properly clearInterval on it
var secInterval;
var currId = 'session-value';  // defines current displayed value so that changes in settings do not reset timer
var timerVal = document.getElementById(currId).innerHTML;
// global element selector
var min = document.getElementById('timer-val-min');
var sec = document.getElementById('timer-val-sec');

function changeVal(id, type) {
    var display = document.getElementById(id);
    var currVal = parseInt(display.innerHTML);

    if (type === '-' && currVal > 1) {
        currVal -= 1;
    } else if (type == '+') {
        currVal += 1;
    }
    
    // change displayed value
    display.innerHTML = currVal;

    // change the value of the session length
    if (id === 'session-value' && currId === 'session-value') {
        document.getElementById('timer-val-min').innerHTML = currVal;
        document.getElementById('timer-val-sec').innerHTML = '00';
        timerVal = currVal;
    }
}

function toggleTimer() {
    nextBreak = !nextBreak;

    if (isRunning) {
        isRunning = !isRunning;     // toggle running status
        // Toggle which icon is shown on the play section
        toggleDisplay('play', 'block');
        toggleDisplay('pause', 'none');
        clearInterval(secInterval);
    } else {
        isRunning = !isRunning;     // toggle running status
        // Toggle which icon is shown on the play section
        toggleDisplay('play', 'none');
        toggleDisplay('pause', 'block');

        // Timer function
        secInterval = setInterval(function() {
            // Get the current value of seconds
            var secVal = sec.innerHTML;
            // change color of progress bar
            document.getElementById('progress').className = currId.substr(0, currId.length - 6);
            // Decrement logics
            if (secVal === "00") {
                // seconds display 0
                var minVal = min.innerHTML;
                if (minVal === "00") {
                    // minutes display 0
                    // Stop the clock
                    clearInterval(secInterval);
                    // Switch the value of id 
                    var str;
                    if (nextBreak) {
                        if (sessionCount % 4 === 0 && sessionCount > 1) {
                            currId = 'break-lg-value';
                            str = 'Long break';
                        } else {                    
                            currId = 'break-value';
                            str = 'Break';
                        }
                    } else {
                        currId = 'session-value';
                        sessionCount += 1;
                        str = 'Working';
                    }
                    // reset variables
                    isRunning = !isRunning;
                    timerVal = document.getElementById(currId).innerHTML;
                    document.getElementById('currTimer').innerHTML = str;
                    // Change the displayed value of minutes
                    min.innerHTML = ('0' + timerVal).slice(-2);
                    // restart the clock with the break or session
                    toggleTimer();
                } else {
                    // Decrease and display the minutes
                    minVal -= 1;
                    min.innerHTML = ('0' + minVal).slice(-2);
                    sec.innerHTML = 59;                                 // Reset seconds
                }
            } else {                                                    // Decrease the seconds
                secVal -= 1;
                sec.innerHTML = ('0' + secVal).slice(-2);
            }

            // calculate remaining time
            var remaining = min.innerHTML * 60 + parseInt(sec.innerHTML); 
            // calculate maxtime
            var maxtime = timerVal * 60;
            // manipulate width to show timer progress
            timerFiller(remaining, maxtime);
        }, 1000);
    }
}

function switchPane() {
    // Switch between settings and timer panel
    if (document.getElementById('setting-container').style.display === 'none') {
        toggleDisplay('setting-container', 'grid');
        toggleDisplay('timer-container', 'none');
    } else {
        toggleDisplay('setting-container', 'none');
        toggleDisplay('timer-container', 'flex');
    }

    if (isRunning) {
        toggleTimer();
    }
}

function toggleDisplay (id, displayValue) {
    document.getElementById(id).style.display = displayValue;
}

function timerFiller(remaining, maxtime) {
    var progressPerc = Math.round((maxtime - remaining) / maxtime * 100 * 100) / 100;
    document.getElementById('progress').style.width = progressPerc + '%';
}

function reset() {
    // stop the timer if
    if(isRunning) {
        isRunning = !isRunning;
        clearInterval(secInterval);
    }
    nextBreak = false;
    sessionCount = 0;

    currId = 'session-value';
    timerVal = document.getElementById(currId).innerHTML;
    min.innerHTML = timerVal;
    sec.innerHTML = '00';
    document.getElementById('progress').style.width = '0%';

    // restart the timer
    toggleTimer();
}