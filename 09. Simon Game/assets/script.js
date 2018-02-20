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
var playerSequence = 0;                                      // Array to register the player
var playerTurn = true;

function computerTurn() {
    const min = 0;
    const max = 3;
    var random = Math.floor(Math.random() * (max - min) + 1) + min;
    var playKey = buttonsKey[random];
    
    for (let i = 0; i <= computerSequence.length; i++) {
        (function(val) {
            setTimeout(() => {
                if (i === computerSequence.length) {
                    playButton(playKey)
                    computerSequence.push(playKey);
                } else {
                    playButton(val);
                }
            }, 1000 * i);
        })(computerSequence[i]);
    }
}


// WORK IN PROGRESS HERE
function playButton(key) {
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    audio.currentTime = 0;
    audio.play();
    activateButton(key);
    if(playerTurn) {
        console.log(computerSequence);
        console.log(key === computerSequence[playerSequence]);
        playerSequence++;
    }
    computerTurn;

}

function activateButton (key) {
    const button = document.querySelector(`div[data-key="${key}"]`); 
    button.classList.toggle("active");
    setTimeout(() => button.classList.toggle("active"),500);
}


