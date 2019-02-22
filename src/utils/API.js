import axios from "axios";

const BASEURL = "https://api.teachieawards.com/api";

export default {
  fetchMethod: function(method) {
    return axios.get(`${BASEURL}${method}`);
  }
};