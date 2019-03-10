import React, { useState, useContext } from 'react';
import { Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { validateAll } from 'indicative';
import PageWrapper from '../components/PageWrapper';
import { ACCESS_TOKEN } from '../constants';
import GlobalContext from '../context/GlobalContext';
import api, { getCurrentUser } from '../utils/API';

const defaultState = { response: false, error: false };

const SignIn = () => {
    const globalContext = useContext(GlobalContext);

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fieldErrors, setFieldErrors] = useState('');
    const [signInResponse, setSignInResponse] = useState(defaultState);

    const { updateLoading, updateAuth, updateUser, auth } = globalContext;

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
            localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
            // refactor to one method (app.jsx)
            const currentUser = await getCurrentUser();
            updateUser(currentUser.data);
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
                <PageWrapper title="Sign In">
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
                        <Col>
                            <FormGroup className="float-right">
                                <Button color="primary" size="lg" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </FormGroup>
                        </Col>
                    </Form>
                </PageWrapper>
            )}
        </>
    );
};

export default SignIn;
