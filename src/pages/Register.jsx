/**
 * This is the registration page.
 * This page handles both user registration and educator registration.
 */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, FormGroup, Label, Input, Button, Alert, NavLink } from 'reactstrap';
import { validateAll } from 'indicative';
import { NavLink as RRNavLink, withRouter } from 'react-router-dom';

import PageWrapper from '../components/PageWrapper';
import GlobalContext from '../context/GlobalContext';
import api from '../utils/API';

const defaultState = { response: false, error: false };

const Register = props => {
    const globalContext = useContext(GlobalContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [fieldErrors, setFieldErrors] = useState('');
    const [registrationResponse, setRegistrationResponse] = useState(defaultState);

    const { updateLoading, user } = globalContext;

    const clearResponseData = () => {
        setRegistrationResponse(defaultState);
    };

    const getRegisterAPIPath = () => {
        const {
            location: { pathname }
        } = props;
        if (pathname.includes('educator')) {
            return '/auth/signup-educator';
        }
        return '/auth/signup';
    };

    const getTitle = () => {
        const {
            location: { pathname }
        } = props;
        if (pathname.includes('educator')) {
            return 'Register Educator';
        }
        return 'Register';
    };

    const postUserData = async data => {
        // clear out response
        clearResponseData();

        // Educator or user?
        const path = getRegisterAPIPath();

        // post to api
        const response = await api.post(path, data);
        if (response && ((response.response && response.response.data) || response.data)) {
            if (response.data && response.data.success) {
                // Success!
                setRegistrationResponse({ response: response.data.message });
            } else {
                // Error(s)
                const {
                    response: { data: responseData = null }
                } = response;

                const errorMessage =
                    responseData.errors && responseData.errors && responseData.errors[0].field
                        ? `${responseData.errors[0].field}: ${responseData.errors[0].defaultMessage}`
                        : responseData.message;
                setRegistrationResponse({ error: errorMessage });
            }
            updateLoading(false);
        }
    };

    const handleSubmit = event => {
        updateLoading(true);
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
            password: 'required|string|min:6|max:35|confirmed'
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
                postUserData(data);
            })
            .catch(errors => {
                const formattedErrors = {};
                errors.forEach(error => {
                    formattedErrors[error.field] = error.message;
                });
                setFieldErrors(formattedErrors);
                updateLoading(false);
            });
    };

    const getErrorMessage = field => {
        const fieldError =
            fieldErrors && fieldErrors[field] ? <div className="text-danger">{fieldErrors[field]}</div> : '';
        return fieldError;
    };

    if (user.username) {
        return <PageWrapper title={getTitle()}>You are already registered.</PageWrapper>;
    }

    return (
        <PageWrapper title={getTitle()}>
            {registrationResponse.error ? <Alert color="danger">{registrationResponse.error}</Alert> : ''}
            {!registrationResponse.response ? (
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
                    <Col>
                        <FormGroup className="float-right">
                            <Button color="primary" size="lg" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </FormGroup>
                    </Col>
                </Form>
            ) : (
                <Alert color="success">
                    You have been successfully registered.{' '}
                    <NavLink tag={RRNavLink} exact to="/signin" className="nav-link">
                        Sign in now
                    </NavLink>
                </Alert>
            )}
        </PageWrapper>
    );
};

Register.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default withRouter(props => <Register {...props} />);
