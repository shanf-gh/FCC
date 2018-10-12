import React, { Component } from 'react';
import './App.scss';

class Drumboard extends Component {
  state = {
    padKeys: ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'],
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
    ]
  }

  handleClick = (e) => {
    const firstChild = e.target.firstChild;
    if (firstChild.nodeName === 'AUDIO') {
      firstChild.play();
    }
  }

  render() {

    const padElem = this.state.padKeys.map((key, i) => {
      return (
        <div className="drum-pad" id={key} key={key} onClick={this.handleClick}>
          <audio src={this.state.HeaterKit[i]}></audio>
          {key}
        </div>
      )
    });

    return (
      <div className="drum-board">
        {padElem}
      </div>
    )
  }
}

class App extends Component {

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress);
  }
  handleKeyPress = (e) => {
    switch (e.key) {
      case 'q':
        console.log('valid');
        break;
      default:
        console.log('not valid');
    }
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="display"></div>
        <Drumboard />
      </div>
    );
  }
}

export default App;
