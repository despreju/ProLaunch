const run = require('./run/runLib.js');

module.exports = function (app) {
    app.post('/createRun',run.createRun);
    app.get('/getAllRuns',run.getAllRuns);
    app.post('/getAllRunsByUser',run.getAllRunsByUser);
    app.post('/deleteRun',run.deleteRun);
}