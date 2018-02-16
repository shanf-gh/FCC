// ========================
//        Controls
// ========================

function toggleButton() {
    if(this.style.marginLeft === "40%") {
        this.style.marginLeft = 0;
    } else {
        this.style.marginLeft = "40%";
    }
}

const powerToggle = document.getElementsByClassName('power-slide__toggle')[0];
powerToggle.addEventListener('click', toggleButton)


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
