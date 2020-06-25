const training = require('./training/trainingLib.js');

module.exports = function (app) {
    app.post('/createTraining',training.createTraining);
    app.get('/getAllTrainings',training.getAllTrainings);
}