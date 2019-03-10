import axios from 'axios';

import { BASE_API_URL, ACCESS_TOKEN } from '../constants';

const requestConfig = () => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    };

    if (localStorage.getItem(ACCESS_TOKEN)) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
    }

    return config;
};

const API = {
    get: path => {
        const config = requestConfig();
        return axios.get(`${BASE_API_URL}${path}`, config);
    },
    post: (path, payload = {}) => {
        const config = requestConfig();
        return axios
            .post(`${BASE_API_URL}${path}`, payload, config)
            .then(response => response)
            .catch(error => error);
    }
};

export const getCurrentUser = async () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        const noTokenErr = new Error('No access token set.');
        return Promise.reject(noTokenErr);
    }

    return API.get('/user/me');
};

export default API;
