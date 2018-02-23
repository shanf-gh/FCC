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
    if (environmentVar.power === 1) return 1; // power === 1 is off, 2 is on
    environmentVar.gameStart = !environmentVar.gameStart;

    if(environmentVar.gameStart) {
        computerTurn();
    } else {
        computerSequence = [];      // reset the computer sequence
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
    playButton(key);
}

const buttons = Array.from(document.querySelectorAll('.game-button'));
buttons.forEach(button => button.addEventListener('click',playSound));

// ========================
//        Game logics
// ========================
const buttonsKey = ['green', 'red', 'blue', 'yellow']       // playable buttons
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
    const max = 3;
    var random = Math.floor(Math.random() * max + 1);
    var newKey = buttonsKey[random];
    console.log("computerTurn");

    for (let i = 0; i <= computerSequence.length; i++) {
        (function(val) {
            setTimeout(() => {
                if (i === computerSequence.length) {
                    playButton(newKey)
                    computerSequence.push(newKey);
                    playerTurn = !playerTurn;
                } else {
                    playButton(val);
                }
            }, 1000 * i);
        })(computerSequence[i]);
    }
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
            }, 1000 * i);
        })(computerSequence[i]);
    }
}

function playButton(key) {
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
                }, 2000); 
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
            }, 1500); 
        }
    }
}

function activateButton (key) {
    const button = document.querySelector(`div[data-key="${key}"]`); 
    button.classList.toggle("active");
    setTimeout(() => button.classList.toggle("active"),500);
}


