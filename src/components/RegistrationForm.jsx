import React, { useState } from 'react';
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { validateAll } from 'indicative';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [fieldErrors, setFieldErrors] = useState('');

    const formStyle = {
        backgroundColor: '#fff',
        minWidth: '450px'
    };

    const containerStyle = {
        height: '90%',
        zIndex: 100,
        position: 'relative'
    };

    const handleSubmit = event => {
        event.preventDefault();
        const data = {
            firstName,
            lastName,
            username,
            email,
            password,
            password_confirmation: passwordConfirmation
        };

        const rules = {
            firstName: 'required|string',
            lastName: 'required|string',
            username: 'required|string',
            email: 'required|email',
            password: 'required|string|min:6|max:10|confirmed'
        };

        const messages = {
            required: ' This field is required.',
            'email.email': 'The email is invalid',
            'password.confirmed': 'The password does not match.'
        };

        validateAll(data, rules, messages)
            .then(() => {
                // reset errors
                setFieldErrors({});
                // post to api
            })
            .catch(errors => {
                const formattedErrors = {};
                errors.forEach(error => {
                    // console.log(error);
                    formattedErrors[error.field] = error.message;
                });
                setFieldErrors(formattedErrors);
            });
    };

    const getErrorMessage = field => {
        const fieldError =
            fieldErrors && fieldErrors[field] ? <div className="text-danger">{fieldErrors[field]}</div> : '';
        return fieldError;
    };

    return (
        <div style={containerStyle} className="d-flex align-items-center">
            <div style={formStyle} className="w-50 mx-auto p-5 border border-primary rounded">
                <h2>Sign Up</h2>
                <Form className="form">
                    <Col>
                        <FormGroup>
                            <Label>First Name</Label>
                            <Input
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="First Name"
                            />
                            {getErrorMessage('firstName')}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Last Name</Label>
                            <Input
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Last Name"
                            />
                            {getErrorMessage('lastName')}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                            />
                            {getErrorMessage('username')}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="myemail@email.com"
                            />
                            {getErrorMessage('email')}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="********"
                            />
                            {getErrorMessage('password')}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="passwordConfirmation">Password Confirmation</Label>
                            <Input
                                value={passwordConfirmation}
                                onChange={e => setPasswordConfirmation(e.target.value)}
                                type="password"
                                name="passwordConfirmation"
                                id="passwordConfirmation"
                                placeholder="********"
                            />
                            {getErrorMessage('passwordConfirmation')}
                        </FormGroup>
                    </Col>
                    <Button color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default SignUp;
