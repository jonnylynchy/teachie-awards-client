import axios from 'axios';

const BASEURL = process.env.NODE_ENV === 'production' ? 'https://api.teachieawards.com/api' : '/api';

export default {
    get: method => {
        return axios.get(`${BASEURL}${method}`);
    }
};
