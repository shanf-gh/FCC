// ========================
//        Controls
// ========================
const buttonToggle = Array.from(document.getElementsByClassName('slide__toggle'));
var environmentVar = {
    gameStart: false,
};

buttonToggle.forEach(toggle => { 
    const name = toggle.dataset.btn;
    const currVal = parseInt(window.getComputedStyle(toggle).getPropertyValue('grid-column-start'));
    environmentVar[name] = currVal;
});

function toggleButton() {
    const curVal = parseInt(window.getComputedStyle(this).getPropertyValue('grid-column-start'));
    const nrPosition = this.dataset.position;
    const btnName = this.dataset.btn;
    // disable toggling buttons when the game has started
    if (environmentVar.gameStart && 
        environmentVar.power === 2 && 
        this.dataset.btn !== 'power') return; // power === 1 is off, 2 is on

    var newVal = 1;
    if(!curVal) {
        newVal = 2;
    } else if (curVal < nrPosition) {
        newVal = curVal + 1;
    }
    // update toggle position
    this.style.gridColumnStart = newVal;
    // update variable's value
    environmentVar[btnName] = newVal;
}

buttonToggle.forEach(toggle => toggle.addEventListener('click', toggleButton));

function startGame() {
    if (environmentVar.power === 1) return; // power === 1 is off, 2 is on
    environmentVar.gameStart = !environmentVar.gameStart;

    if(environmentVar.gameStart) {
        computerTurn();
    } else {
        console.log("turned off");
        computerSequence = [];      // reset the computer sequence
        playerTurn = !playerTurn;
    }
}

document.getElementsByClassName("js-start")[0].addEventListener('click', startGame);
document.getElementsByClassName("js-last")[0].addEventListener('click', replaySequence);


// ========================
//      Game environment
// ========================

// Playing sounds
function playSound() {
    var key = this.dataset.key;
    if (!playerTurn) return; // power === 1 is off, 2 is on
    playButton(key);
}

const buttons = Array.from(document.querySelectorAll('.game-button'));
buttons.forEach(button => button.addEventListener('click',playSound));

// ========================
//        Game logics
// ========================
const buttonsKey = ['green', 'red', 'blue', 'yellow']       // playable buttons
let speed = 1000;
var computerSequence = [];                                  // Computer sequence
var longestSequence = [];                                   // Longest sequence played
var playerSequence = 0;                                     // Array to register the player
var playerTurn = false;

var skillLevel = {
    1: 8,
    2: 14,
    3: 20,
    4: 31,
    5: 42,
}


function computerTurn() {
    let max = 4;
    let newKey = getKey(buttonsKey, max);
    let seqLen = computerSequence.length;

    // check if game finished
    if(seqLen > skillLevel[environmentVar.skill] - 1) {
        console.log('you win');
        return;
    }

    // increase speed
    if (seqLen && seqLen < 15 && seqLen % 4 === 0) {
        speed -= 200;
    }
    
    // check that the newKey is different than the two last one
    if ( seqLen > 1 &&
    computerSequence[seqLen-1] === computerSequence[seqLen-2] &&
    computerSequence[seqLen-1] === newKey) {
        // filter array
        let filtbuttons = buttonsKey.filter(key => key !== newKey);
        // redefine maximum choices and newKey
        newKey = getKey(filtbuttons, max--);
    }

    // replay sequence and play newKey
    // OPTIMIZATION OPPORTUNITY
    // call replaySequence then play newKey
    for (let i = 0; i <= seqLen; i++) {
        (function(val) {
            setTimeout(() => {
                if (i === seqLen) {
                    playButton(newKey)
                    computerSequence.push(newKey);
                    playerTurn = !playerTurn;
                } else {
                    playButton(val);
                }
            }, speed * i);
        })(computerSequence[i]);
    }
}

function getKey(arr, max) {
    var random = Math.floor(Math.random() * max);
    return arr[random];
}

function replaySequence() {
    for (let i = 0; i <= computerSequence.length; i++) {
        (function(val) {
            setTimeout(() => {
                if (i === computerSequence.length) {
                    playerTurn = !playerTurn;
                } else {
                    playButton(val);
                }
            }, speed * i);
        })(computerSequence[i]);
    }
}

function playButton(key) {
    if (!environmentVar.gameStart) return; // power === 1 is off, 2 is on
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    audio.currentTime = 0;
    audio.play();
    activateButton(key);
    
    // Check played key vs computer sequence
    if (environmentVar.gameStart && playerTurn) {
        if(computerSequence[playerSequence] === key) {
            if(playerSequence === computerSequence.length - 1) {
                playerSequence = 0;
                playerTurn = !playerTurn;
                setTimeout(() => {
                    computerTurn();
                }, speed * 2); 
            } else {
                console.log("Sequence is correct!!!!");
                playerSequence++;
            }
        } else {
            console.log("Sequence is wrong!!!!");
            playerTurn = !playerTurn;
            playerSequence = 0;
            setTimeout(() => {
                replaySequence();
            }, speed * 1.5); 
        }
    }
}

function activateButton (key) {
    const button = document.querySelector(`div[data-key="${key}"]`); 
    button.classList.toggle("active");
    setTimeout(() => button.classList.toggle("active"),500);
}


