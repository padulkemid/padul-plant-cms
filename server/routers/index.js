const route = require('express').Router();
const Products = require('./product');
const Users = require('./user');

route.use(Users);
route.use('/items', Products);

module.exports = route;
