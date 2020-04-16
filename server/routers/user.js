const route = require('express').Router();
const UserController = require('../controllers/user');
const { authentication } = require('../middlewares/auths');

// Read and New user
route.post('/login', UserController.login);
route.post('/register', UserController.register);
route.get('/users', authentication, UserController.getUsers);

module.exports = route;
