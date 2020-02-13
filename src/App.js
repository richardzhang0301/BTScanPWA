import React, { Component, useState } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import logo from './logo.svg';
import './App.css';

const logic = () => {
  

  let filters = [];
  let options = {};
  options.acceptAllAdvertisements = true;
  options.keepRepeatedDevices = false;
  options.active = false;

  console.log('Requesting Bluetooth Scan without options: ');
  navigator.bluetooth.requestLEScan(options)
  .then(function(scaner) {
    navigator.bluetooth.addEventListener('advertisementreceived', event => {
      console.log('  Device Name: ' + event.device.name);
    });

    setTimeout( function() {
      scaner.stop();
    }, 2000);
  })
  .catch(function(error) {
    // And of course: error handling!
    console.error('Connection failed!', error);
  });
}

const btnScanHandler = () => {
  console.log('adsfasdf');
  logic();
};

const Page = ({ title }) => (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button id="btnAdd" onClick={btnScanHandler}>Scan</button>
        <h2>{title}</h2>
      </div>
      <p className="App-intro">
        This is the {title} page.
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/about">About</Link>
      </p>
      <p>
        <Link to="/settings">Settings</Link>
      </p>
      
    </div>
);

const Home = (props) => (
  <Page title="Home"/>
);

const About = (props) => (
  <Page title="About"/>
);

const Settings = (props) => (
  <Page title="Settings"/>
);

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/settings" component={Settings}/>
      </Router>
    );
  }
}

export default App;
