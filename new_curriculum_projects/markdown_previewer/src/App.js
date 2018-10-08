import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="markdown-box">
        <h1>Markdown Previewer</h1>
        <div id="text-area">
          <textarea name="text-input" id="" cols="30" rows="10"></textarea>
          <div id="preview"></div>
        </div>
      </div>
    );
  }
}

export default App;
