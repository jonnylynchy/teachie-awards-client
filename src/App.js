import React, { Component } from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink, Card, CardTitle, CardText, Button } from 'reactstrap';

import API from './utils/API';
import './App.css';
import award from './images/temp-award-2.png';
// import circle from './images/left-circle-half.svg';
// import hex from './images/right-hex.svg';

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
        <div className="circle"></div>
        <div className="hex"></div>
        {/* NAV */}
        <div className="d-flex flex-row-reverse mr-5">
          <Nav>
            <NavItem>
              <NavLink href="#">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Events</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Winners</NavLink>
            </NavItem>
          </Nav>
        </div>
        {/* HERO */}
        <Container className="hero">
          <Row className="row">
            <div className="col-3">
              <div className="mt-5 pt-5">
                <img className="mt-5" src={award} alt="Teachie Awards" />
              </div>
            </div>
            <div className="col-9">
              <div className="mt-5 pt-5">
                <h1 className="mt-5 display-2">Teachie Awards</h1>
                <p className="lead mt-4 ml-3">The Teachie Awards give students, faculty and communities the ability to recognize the educators among us who give their time to empower kids to have better and brighter futures.</p>
                <p className="mt-4 ml-3"><small><b>Server Message: </b>{this.state.serverMessage}</small></p>
              </div>
            </div>
          </Row>
        </Container>
        {/* CARDS */}
        <Container>
          <Row>
            <Col sm="12">
              <div className="my-5 py-5"></div>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle><h3>Fellow Faculty &amp; Students</h3></CardTitle>
                <CardText>Register to nominate and vote for your favorite teacher!</CardText>
                <Button color="primary">Register</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle><h3>Teachers and Educators</h3></CardTitle>
                <CardText>Interested in participating in Teachies Register to be rewarded by your peers and students.</CardText>
                <Button color="primary">Register</Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
