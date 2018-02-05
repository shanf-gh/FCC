function changeVal(id, type) {
    var display = document.getElementById(id);
    var currVal = parseInt(display.innerHTML);

    if (type === '-' && currVal > 0) {
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
    }
}

// set switch variables
var isRunning = false;
var nextBreak = false;
var sessionCount = 0;
// secInterval needs to be declared outside the function toggleTimer 
// otherwise will create a new var for every click and won't be able
// to properly clearInterval on it
var secInterval;
var currId = 'session-value';  // defines current displayed value so that changes in settings do not reset timer
var timerVal = 0;

function toggleTimer() {
    var min = document.getElementById('timer-val-min');
    var sec = document.getElementById('timer-val-sec');
    nextBreak = !nextBreak;

    if (isRunning) {
        // pause the timer
        // toggle isRunning variable
        isRunning = !isRunning;
        // Toggle which icon is shown on the play section
        document.getElementById('play').style.display = 'block';
        document.getElementById('pause').style.display = 'none';
        clearInterval(secInterval);
    } else {
        timerVal = document.getElementById(currId).innerHTML;
        // toggle the isRunning variable
        isRunning = !isRunning;
        // Toggle which icon is shown on the play section
        document.getElementById('play').style.display = 'none';
        document.getElementById('pause').style.display = 'block';

        // Timer function
        secInterval = setInterval(function() {
            // Get the current value of seconds
            var secVal = sec.innerHTML;

            // Decrement logics
            if (secVal === "00") {
                // seconds display 0
                var minVal = min.innerHTML;
                if (minVal === "00") {
                    // minutes display 0
                    // Stop the clock
                    clearInterval(secInterval);
                    // Switch the value of id 
                    if (nextBreak) {
                        if (sessionCount % 4 === 0) { 
                            currId = 'break-lg-value';
                            currProgStyle = 'lg-break';
                        } else {                    
                            currId = 'break-value';
                            currProgStyle = 'break';
                        }
                    } else {
                        currId = 'session-value';
                        currProgStyle = 'session';
                        sessionCount += 1;
                    }
                    // change color of progress bar
                    document.getElementById('progress').className = currProgStyle;
                    // reset variables
                    isRunning = !isRunning;
                    // Change the displayed value of minutes
                    min.innerHTML = ('0' + timerVal).slice(-2);
                    // restart the clock with the break or session
                    toggleTimer();
                } else {
                    // Decrease the minutes
                    minVal -= 1;
                    // Display the minutes
                    min.innerHTML = ('0' + minVal).slice(-2);
                    // Reset seconds
                    sec.innerHTML = 59;
                }
            } else {
                // Decrease the seconds
                secVal -= 1;
                sec.innerHTML = ('0' + secVal).slice(-2);
            }

            // calculate remaining time
            var remaining = min.innerHTML * 60 + parseInt(sec.innerHTML); 
            // calculate maxtime
            console.log(timerVal);
            var maxtime = timerVal * 60;
            // manipulate width to show timer progress
            timerFiller(remaining, maxtime);
        }, 1000);
    }
}

function switchPane() {
    var settingPane = document.getElementById('setting-container');
    var timerPane = document.getElementById('timer-container');

    // Switch between settings and timer panel
    if (settingPane.style.display === 'none') {
        settingPane.style.display = 'grid';
        timerPane.style.display = 'none';
    } else {
        settingPane.style.display = 'none';
        timerPane.style.display = 'flex';
    }

    if (isRunning) {
        toggleTimer();
    }
}

function timerFiller(remaining, maxtime) {
    var progressPerc = Math.round((maxtime - remaining) / maxtime * 100 * 100) / 100;
    document.getElementById('progress').style.width = progressPerc + '%';
}