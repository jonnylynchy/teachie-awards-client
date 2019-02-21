import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    message: 'Teachie Awards | A work in progress.',
    serverMessage: ''
  };

  componentDidMount() {
    this.upTest();
  }

  
  upTest = () => {
    fetch('http://teachie-awards-vpc.us-west-2.elasticbeanstalk.com/api/public/uptest')
      .then(response => response.text())
      .then(serverMessage => {
          this.setState({serverMessage: serverMessage});
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.message}</h1>
          <h3>{this.state.serverMessage}</h3>
        </header>
      </div>
    );
  }
}

export default App;
