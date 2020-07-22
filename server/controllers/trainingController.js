const training = require('./training/trainingLib.js');

module.exports = function (app) {
    app.post('/createTraining',training.createTraining);
    app.post('/saveTraining',training.saveTraining);
    app.post('/deleteTraining',training.deleteTraining);
    app.post('/getTrainingByName',training.getTrainingByName);
    app.get('/getAllTrainings',training.getAllTrainings);
}