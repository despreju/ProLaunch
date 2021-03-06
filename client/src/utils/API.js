import axios from "axios";

const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8800";


//USERS
export default {
  login: function(email, password) {
    return axios.post(`${burl}/user/login`, { email,password }, { headers: headers });
  },

  signup: function(send) {
    return axios.post(`${burl}/user/signup`, send, { headers: headers });
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },

  getProfile: function() {
    const profile = JSON.parse(localStorage.getItem("profile"));
    return (profile != null ?  profile : {profile : {email : null, name : null, level : null}})
  },

  logout: function() {
    localStorage.clear();
  },

  getAllUsers: function() {
    return axios.get(`${burl}/user/getAllUsers`);
  },

  setAdmin: function(send) {
    return axios.post(`${burl}/user/setAdmin`, send, { headers: headers });
  },

  deleteUser: function(send) {
    return axios.post(`${burl}/user/deleteUser`, send, { headers: headers });
  },


  //EXERCISES
  createExercise: function(send) {
    return axios.post(`${burl}/exercise/createExercise`, send, { headers: headers });
  },

  deleteExercise: function(send) {
    return axios.post(`${burl}/exercise/deleteExercise`, send, { headers: headers });
  },

  getAllExercises: function() {
    return axios.get(`${burl}/exercise/getAllExercises`);
  },

  //TRAININGS
  createTraining: function(send) {
    return axios.post(`${burl}/training/createTraining`, send, { headers: headers });
  },

  saveTraining: function(send) {
    return axios.post(`${burl}/training/saveTraining`, send, { headers: headers });
  },

  deleteTraining: function(send) {
    return axios.post(`${burl}/training/deleteTraining`, send, { headers: headers });
  },

  getTrainingByName: function(send) {
    return axios.post(`${burl}/training/getTrainingByName`, send, { headers: headers });
  },

  getAllTrainings: function() {
    return axios.get(`${burl}/training/getAllTrainings`);
  },

  //RUN
  createRun: function(send) {
    return axios.post(`${burl}/run/createRun`, send, { headers: headers });
  },

  getAllRuns: function() {
    return axios.get(`${burl}/run/getAllRuns`);
  },

  getAllRunsByUser: function(send) {
    return axios.post(`${burl}/run/getAllRunsByUser`, send, { headers: headers });
  },

  deleteRun: function(send) {
    return axios.post(`${burl}/run/deleteRun`, send, { headers: headers });
  }

};