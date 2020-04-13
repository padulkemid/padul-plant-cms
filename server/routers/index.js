const route = require('express').Router();
const Products = require('./product');
const Users = require('./user');
const errorHandler = require('../middlewares/error_handler');

route.use(Users);
route.use('/items', Products);
route.use(errorHandler);

module.exports = route;
