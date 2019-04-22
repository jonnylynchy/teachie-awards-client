/**
 * This is the home page.
 */
import React from 'react';
import { Container, Row, Col, Card, CardTitle, CardText, Button } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

import award from '../images/temp-award-2.png';

const Home = props => {
    return (
        <>
            {/* HERO */}
            <Container className="hero">
                <Row>
                    <div className="col-lg-3 d-none d-lg-flex">
                        <div className="mt-5 pt-5">
                            <img className="mt-5" src={award} alt="Teachie Awards" />
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-9">
                        <div className="mt-md-5 pt-5">
                            <h1 className="mt-5 display-2">Teachie Awards</h1>
                            <p className="lead mt-4 ml-3">
                                The Teachie Awards give students, faculty and communities the ability to recognize the
                                educators among us who give their time to empower kids to have better and brighter
                                futures.
                            </p>
                        </div>
                    </div>
                </Row>
            </Container>
            {/* CARDS */}
            <Container>
                <Row>
                    <Col sm="12">
                        <div className="my-5" />
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <Card body className="border border-primary rounded mb-3">
                            <CardTitle>
                                <h3>Fellow Faculty &amp; Students</h3>
                            </CardTitle>
                            <CardText>
                                Have someone in mind? Register to nominate and vote for your favorite teacher!
                            </CardText>
                            <Button color="primary" to="/register" tag={RRNavLink}>
                                Register
                            </Button>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card body className="border border-primary rounded mb-3">
                            <CardTitle>
                                <h3>Teachers and Educators</h3>
                            </CardTitle>
                            <CardText>
                                Interested in participating in Teachies Register to be rewarded by your peers and
                                students.
                            </CardText>
                            <Button color="primary" to="/register-educator" tag={RRNavLink}>
                                Register
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;
