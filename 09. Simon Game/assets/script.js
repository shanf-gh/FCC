// ========================
//        Controls
// ========================

function toggleButton() {
    if(this.style.marginLeft === "20%") {
        this.style.marginLeft = 0;
    } else {
        this.style.marginLeft = "20%";
    }
}

const powerToggle = Array.from(document.getElementsByClassName('power-slide__toggle'));
powerToggle.forEach(toggle => toggle.addEventListener('click', toggleButton));

function toggleButton2() {
    const curVal = parseInt(this.style.gridColumnStart);
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

const powerToggle2 = Array.from(document.getElementsByClassName('slide__toggle'));
powerToggle2.forEach(toggle => toggle.addEventListener('click', toggleButton2));

// ========================
//        Game logics
// ========================

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${this.dataset.key}"]`);
    audio.currentTime = 0;
    audio.play();
}

const buttons = Array.from(document.querySelectorAll('.game-button'));
buttons.forEach(button => button.addEventListener('click',playSound));
