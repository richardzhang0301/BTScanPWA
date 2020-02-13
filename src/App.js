import React, { Component, useState } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    text: ''
  }

  constructor(props) {
    super(props);
  }
  
  getDateTime = () => {
    var currentdate = new Date(); 
    var datetime = " " + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
    return datetime;
  }

  logic = () => {
    var counter = 0;
    let thisthis = this;
    let filters = [];
    let options = {};
    options.acceptAllAdvertisements = true;
    options.keepRepeatedDevices = false;
    options.active = false;

    console.log('Requesting Bluetooth Scan without options: ');
    navigator.bluetooth.requestLEScan(options)
    .then(function(scaner) {
      navigator.bluetooth.addEventListener('advertisementreceived', event => {
        counter++;
        // let output = event.device.id
        // thisthis.setState({
        //   text: thisthis.state.text + output + '\r'
        // });
        console.log('  Device Name: ' + event.device.id);
      });

      setTimeout( function() {
        scaner.stop();

        thisthis.setState({
            text: thisthis.state.text + '|' + counter + ' device scanned @ ' + thisthis.getDateTime() + '|'
          });
      }, 2000);
    })
    .catch(function(error) {
      // And of course: error handling!
      thisthis.setState({
        text: thisthis.state.text + '|' + 'Need user interaction' + counter + ' device scanned @ ' + thisthis.getDateTime() + '|'
      });
      console.error('Connection failed!', error);
    });

    setTimeout( function() {
      thisthis.logic();
    }, 20000);
  }

  btnScanHandler = () => {
    this.logic();
  }

  render() {
    return (
      <div className="App">  
        <button id="btnAdd" onClick={this.btnScanHandler}>Scan</button>
      <p className="App-intro">
        <label>{this.state.text}</label>
      </p>
      
    </div>
    );
  }
}

export default App;
