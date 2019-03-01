import axios from 'axios';

const BASEURL = process.env.NODE_ENV === 'production' ? 'https://api.teachieawards.com/api' : '/api';

export default {
    get: path => {
        return axios.get(`${BASEURL}${path}`);
    },
    post: (path, payload = {}) => {
        return axios
            .post(`${BASEURL}${path}`, payload)
            .then(response => response)
            .catch(error => error);
    }
};
