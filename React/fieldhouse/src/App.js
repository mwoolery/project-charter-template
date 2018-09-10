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
          
          <a class="twitter-timeline" data-chrome="nofooter noheader noborders" data-width="700px" data-height="700px" data-partner="tweetdeck" href="https://twitter.com/woolerymatt1/timelines/1037388455716835328?ref_src=twsrc%5Etfw">Demo For Fieldhouse App</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
      <div className="container">
      
     
      </div>
      
    
      
     
  </section>
  
      </div>
      
    );
  }
}

export default App;
