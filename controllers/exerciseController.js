const exercise = require('./exercise/exerciseLib.js');

module.exports = function (app) {
    app.post('/createExercise',exercise.createExercise);
    app.get('/getAllExercises',exercise.getAllExercises);
}