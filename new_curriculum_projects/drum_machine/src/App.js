import React, { Component } from 'react';
import './App.scss';

class Drumboard extends Component {
  render() {
    const padElem = this.props.padKeys.map((key, i) => {
      const keyCode = key.charCodeAt(0);
      return (
        <div className="drum-key"
          id={key}
          data-key={keyCode}
          key={key}
          onClick={(e) => this.props.playSound(e)}>

          <audio data-key={keyCode} src={this.props.soundKit[i]}></audio>
          {key}
        </div>
      )
    });

    return (
      <div className="drumpad-container">
        {padElem}
      </div>
    )
  }
}

class App extends Component {
  state = {
    volume: 0.75,
    display: '',
    padKeys: ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'],
    soundKits: {
      HeaterKit: [
        "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      ],
      SmoothPianoKit: [
        "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
        "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
      ],
    }
  }

  playSound = (e) => {
    const keyCode = e.keyCode ? e.keyCode : e.target.id.charCodeAt(0);
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`)
    const key = document.querySelector(`.drum-key[data-key="${keyCode}"]`)

    if (!audio) return; // stop the function from running if no corresponding audio is found
    audio.currentTime = 0;  // rewind the audio to start
    audio.volume = this.state.volume;
    audio.play();
    key.classList.add('playing');
  }

  removeTransition = (e) => {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  adjustVolume = (e) => {
    this.setState({
      volume: e.target.value,
      display: `Volume is ${Math.round(e.target.value * 100)}`,
    })
  }

  componentDidMount() {
    window.addEventListener('keydown', this.playSound);

    const keys = document.querySelectorAll('.drum-key');
    keys.forEach(key => key.addEventListener('transitionend', this.removeTransition))
  }

  render() {
    const soundKit = 'HeaterKit';
    return (
      <div id="app">
        <h1>Drum Machine</h1>
        <div id="drum-machine">
          <Drumboard
            padKeys={this.state.padKeys}
            soundKit={this.state.soundKits[soundKit]}
            playSound={this.playSound} />
          <div className="control-container">
            <div id="display">{this.state.display}</div>
            <div className="volume-slider">
              <input type="range" min="0" max="1" step="0.01" value={this.state.volume} onChange={this.adjustVolume} />
            </div>
            <div className="sound-kit">
              <p>Soundkit</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
