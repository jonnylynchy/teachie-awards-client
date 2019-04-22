/**
 * API
 * These functions simplify the fetching of data from APIs.
 */

import axios from 'axios';

import { BASE_API_URL, ACCESS_TOKEN } from '../constants';

/**
 * This function sets up a config object to pass along the json web token with requests
 */
const requestConfig = () => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    };

    if (localStorage.getItem(ACCESS_TOKEN)) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
    }

    return config;
};

/**
 * Main API object to be used when fetching APIs
 */
const API = {
    get: path => {
        const config = requestConfig();
        return axios
            .get(`${BASE_API_URL}${path}`, config)
            .then(response => response)
            .catch(error => {
                // if refresh auth attempt fails
                // delete expired token
                if (error.toString().indexOf('401') > -1 && !!localStorage.getItem(ACCESS_TOKEN)) {
                    localStorage.removeItem(ACCESS_TOKEN);
                }
                return error;
            });
    },
    post: (path, payload = {}) => {
        const config = requestConfig();
        return axios
            .post(`${BASE_API_URL}${path}`, payload, config)
            .then(response => response)
            .catch(error => error);
    }
};

/**
 * This function will return the current user
 */
export const getCurrentUser = async () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        const noTokenErr = new Error('No access token set.');
        return Promise.reject(noTokenErr);
    }

    return API.get('/user/me');
};

export default API;
