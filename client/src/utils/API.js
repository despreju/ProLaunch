import axios from "axios";

const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
  login: function(email, password) {
    return axios.post(
      `${burl}/user/login`,
      {
        email,
        password
      },
      {
        headers: headers
      }
    );
  },

  signup: function(send) {
    return axios.post(`${burl}/user/signup`, send, { headers: headers });
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },

  getProfile: function() {
    const profile = JSON.parse(localStorage.getItem("profile"));
    return (profile != null ?  profile : {profile : {email : null, name : null}})
  },

  logout: function() {
    localStorage.clear();
  },

  getAllUsers: function() {
    return axios.get(`${burl}/user/getAllUsers`);
  }
};