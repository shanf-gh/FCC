// ========================
//        Controls
// ========================

function toggleButton() {
    const curVal = parseInt(window.getComputedStyle(this).getPropertyValue('grid-column-start'));
    const nrPosition = this.dataset.position;
    var newVal = 0;

    if(!curVal) {
        newVal = 2;
    } else if (curVal < nrPosition) {
        newVal = curVal + 1;
    } else {
        newVal = 1;
    };
    this.style.gridColumnStart = newVal;
}

const powerToggle = Array.from(document.getElementsByClassName('slide__toggle'));
powerToggle.forEach(toggle => toggle.addEventListener('click', toggleButton));

function startGame() {
    computerTurn();
}

document.getElementsByClassName("js-start")[0].addEventListener('click', startGame);


// ========================
//      Game environment
// ========================

// Playing sounds

function playSound() {
    var key = this.dataset.key;
    playButton(key);
    // if (playerTurn) {
    //     player.push(key);
    //     console.log("Player: ");
    //     console.log(player);
    // }
}

const buttons = Array.from(document.querySelectorAll('.game-button'));
buttons.forEach(button => button.addEventListener('click',playSound));

// ========================
//        Game logics
// ========================
const buttonsKey = ['green', 'red', 'blue', 'yellow']       // playable buttons
var computerSequence = [];                                  // Computer sequence
var playerSequence = 0;                                     // Array to register the player
var playerTurn = false;

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
    if (playerTurn) {
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


