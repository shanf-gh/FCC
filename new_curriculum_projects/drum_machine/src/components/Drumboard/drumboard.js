import React, { Component } from 'react';
import './drumboard.scss';

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

          <audio
            data-key={keyCode}
            data-name={this.props.soundKit[i].name}
            src={this.props.soundKit[i].url}></audio>
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

export default Drumboard;