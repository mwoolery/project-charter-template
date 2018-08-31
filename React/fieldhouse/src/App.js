import React, { Component } from 'react';
import './App.css';
import Announcements from './Announcements/Announcements'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href = "http://www.nwmissouri.edu">
          <img src= "../northwest.png" className="App-logo" alt="logo" />
         </a>
          <h1 className="App-title">Hughes FieldHouse</h1>
        </header>
        <p className="App-intro">
          Welcome to the Hughes FieldHouse PWA, Make sure to check the Announcements section for Updates
        </p>
        <section className="announcements--section">
      <div className="container">
          <h1> Announcements and News</h1>
      </div>
      <div className="announcements--section__inner">
          <Announcements />
          
      </div>
  </section>
      </div>
     
    );
  }
}

export default App;
