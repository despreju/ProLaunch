const user = require('./user/userLib.js');

module.exports = function (app) {
    app.post('/login',user.login);
    app.post('/signup',user.signup);
    app.get('/getAllUsers',user.getAllUsers);
    app.post('/deleteUser',user.deleteUser);
    app.post('/setAdmin',user.setAdmin);
}