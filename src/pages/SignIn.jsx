import React, { useState, useContext } from 'react';
import { Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { validateAll } from 'indicative';

import GlobalContext from '../context/GlobalContext';
import api from '../utils/API';

const defaultState = { response: false, error: false };

const SignIn = () => {
    const globalContext = useContext(GlobalContext);

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fieldErrors, setFieldErrors] = useState('');
    const [signInResponse, setSignInResponse] = useState(defaultState);

    const { updateLoading, updateAuth, auth } = globalContext;

    const formStyle = {
        backgroundColor: '#fff',
        minWidth: '450px'
    };

    const containerStyle = {
        height: '90%',
        zIndex: 100,
        position: 'relative'
    };

    const clearResponseData = () => {
        setSignInResponse(defaultState);
    };

    const postUserData = async data => {
        // clear out response
        clearResponseData();

        // post to api
        const response = await api.post('/auth/signin', data);

        if (response.status === 200) {
            updateLoading(false);
            updateAuth(response.data);
        } else if (response.response.data.error) {
            setSignInResponse({ error: response.response.data.message });
            updateLoading(false);
        }
    };

    const handleSubmit = event => {
        updateLoading(true);
        event.preventDefault();
        const data = {
            usernameOrEmail,
            password
        };

        const rules = {
            usernameOrEmail: 'required|string|min:6|max:50',
            password: 'required|string|min:6|max:10'
        };

        const messages = {
            required: ' This field is required.'
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

    return (
        <>
            {auth.accessToken ? (
                <Redirect to="/events" />
            ) : (
                <div style={containerStyle} className="d-flex align-items-center">
                    <div style={formStyle} className="w-50 mx-auto p-5 border border-primary rounded">
                        <h2>Sign In</h2>
                        {signInResponse.error ? <Alert color="danger">{signInResponse.error}</Alert> : ''}
                        <Form className="form">
                            <Col>
                                <FormGroup>
                                    <Label>Username or Email</Label>
                                    <Input
                                        value={usernameOrEmail}
                                        onChange={e => setUsernameOrEmail(e.target.value)}
                                        type="text"
                                        name="usernameOrEmail"
                                        id="usernameOrEmail"
                                        placeholder="Username or Email"
                                    />
                                    {getErrorMessage('usernameOrEmail')}
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
                            <Button color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            )}
        </>
    );
};

export default SignIn;
