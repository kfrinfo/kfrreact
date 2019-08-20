import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import profilePicture from './profilePicture.jpg'; // Tell Webpack this JS file uses this image



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="Container">
            <img src={logo} className="App-logo" alt="logo"/>
            <svg>
              <rect></rect>
            </svg>
          </div>
        </div>
        <p>
          <img src={profilePicture} className="App-profilePicture" alt="profilePicture" />
        </p> 
        <p className="App-intro">
          Site professionnel conçu avec React.js
          ;)
        </p>
      </div>
    );
  }
}

export default App;
