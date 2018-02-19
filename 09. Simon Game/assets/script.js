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

// ========================
//        Game logics
// ========================

// Playing sounds

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${this.dataset.key}"]`);
    audio.currentTime = 0;
    audio.play();
}

const buttons = Array.from(document.querySelectorAll('.game-button'));
buttons.forEach(button => button.addEventListener('click',playSound));

// Registering player's game
// playable buttons
const buttonsKey = ['green', 'red', 'blue', 'yellow']

// Computer sequence
var computerSequence = [];

function startGame() {
    const min = 0;
    const max = 3;
    var random = Math.floor(Math.random() * (max - min) + 1) + min;
    var playKey = buttonsKey[random];
    
    if(computerSequence.length>0) {
        for (let i = 0; i < computerSequence.length; i++) {
            playButton(computerSequence[i]);    
        }

        // computerSequence.forEach(key => playButton(key));
    }
    console.log("played new!");
    playButton(playKey);  
    computerSequence.push(playKey);   
    console.log(computerSequence);
}

function playButton(button) {
    const audio = document.querySelector(`audio[data-key="${button}"]`);
    audio.play();
}

document.getElementsByClassName("js-start")[0].addEventListener('click', startGame);

// Array to register the player
var player = [];

// listening function
function playSound2(e) {
    const audio = document.querySelector(`audio[data-key="${this.dataset.key}"]`);
    const button = this;
    audio.currentTime = 0;
    audio.play();
    player.push(button.dataset.key);

    button.classList.toggle("active")
    setTimeout(() => button.classList.toggle("active"),500);
}
buttons.forEach(button => button.addEventListener('click',playSound2));