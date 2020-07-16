const run = require('./run/trainingHistoryLib.js');

module.exports = function (app) {
    app.post('/createRun',run.createRun);
}