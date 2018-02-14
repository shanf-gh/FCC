console.log('Script is connected!');





function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${this.dataset.key}"]`);
    audio.currentTime = 0;
    audio.play();
}

const buttons = Array.from(document.querySelectorAll('.game-button'));
buttons.forEach(button => button.addEventListener('click',playSound));