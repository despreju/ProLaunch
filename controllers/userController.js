const user = require('./user/userLib.js');

module.exports = function (app) {
    app.post('/login',user.login);
    app.post('/signup',user.signup);
    app.get('/getAllUsers',user.getAllUsers);
}