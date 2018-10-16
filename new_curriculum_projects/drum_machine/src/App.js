import React, { Component } from 'react';
import './App.scss';
import Drumboard from './components/Drumboard/drumboard';
import Control from './components/Control/control';

class App extends Component {
  state = {
    volume: 0.75,
    display: '',
    padKeys: ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'],
    soundKits: {
      HeaterKit: [
        {
          name: "Heater 1",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
        },
        {
          name: "Heater 2",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
        },
        {
          name: "Heater 3",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
        },
        {
          name: "Heater 4",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
        },
        {
          name: "Clap",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
        },
        {
          name: "Open HH",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
        },
        {
          name: "Kick n'Hat",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
        },
        {
          name: "Kick",
          url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
        },
        {
          name: "Closed HH",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.m"
        }
      ]
      ,
      SmoothPianoKit: [
        {
          name: "Chord 1",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
        },
        {
          name: "Chord 2",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
        },
        {
          name: "Chord 3",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
        },
        {
          name: "Shaker",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
        },
        {
          name: "Open HH",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
        },
        {
          name: "Closed HH",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
        },
        {
          name: "Punchy Kick",
          url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
        },
        {
          name: "Side Stick",
          url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
        },
        {
          name: "Snare",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
        },
      ]
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

    this.setState({
      display: audio.dataset.name,
    });
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
          <Control
            display={this.state.display}
            volume={this.state.volume}
            adjustVolume={this.adjustVolume} />
        </div>
      </div>
    );
  }
}

export default App;
