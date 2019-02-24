import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const SignUp = () => {
    const style = {
        backgroundColor: '#fff'
    };

    return (
        <Container className="d-flex h-100">
            <Row className="align-items-center h-100 w-100">
                <div
                    style={style}
                    className="col-sm-12 col-md-6 offset-md-3 col-12 mx-auto p-5 border border-primary rounded"
                >
                    <h2>Sign Up</h2>
                    <Form className="form">
                        <Col>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input type="text" name="name" id="name" placeholder="FirstName LastName" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input type="text" name="username" id="userName" placeholder="username" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="email" name="email" id="email" placeholder="myemail@email.com" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="********" />
                            </FormGroup>
                        </Col>
                        <Button color="primary">Submit</Button>
                    </Form>
                </div>
            </Row>
        </Container>
    );
};

export default SignUp;
