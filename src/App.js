import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

import API from './utils/API';
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
      <React.Fragment>
        <div className="d-flex flex-row-reverse mr-5">
          <Nav>
            <NavItem>
              <NavLink href="#">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Awards</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Vote</NavLink>
            </NavItem>
          </Nav>
        </div>
        <div className="container hero">
          <div className="row">
            <div className="col">
              <div className="mt-5 pt-5">
                <h1 className="mt-5 display-2">Teachie Awards</h1>
                <p className="lead mt-4 ml-3">The Teachie Awards give students, faculty and communities the ability to recognize the educators among us who give their time to empower kids to have better and brighter futures.</p>
                <p className="mt-4 ml-3"><small>{this.state.serverMessage}</small></p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
