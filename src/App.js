import React, { Component } from 'react';

import API from './utils/API';
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
    API.fetchMethod('/public/uptest')
      .then(res => this.setState({serverMessage: res.data}))
      .catch(err => console.log(err));
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
