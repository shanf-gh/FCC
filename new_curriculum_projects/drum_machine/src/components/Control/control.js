import React, { Component } from 'react';
import './control.scss';

class Control extends Component {
    render() {
        return (
            <div className="control-container">
                <div id="display">{this.props.display}</div>
                <div className="volume-slider">
                    <input type="range" min="0" max="1" step="0.01" value={this.props.volume} onChange={this.props.adjustVolume} />
                </div>
                <div className="sound-kit">
                    <p>Soundkit</p>
                    <div className="sound-kit_select">
                        <div className="sound-kit-select-inner"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Control;