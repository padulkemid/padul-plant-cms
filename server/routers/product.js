const route = require('express').Router();
const ProductController = require('../controllers/product');
const { authentication, authorization } = require('../middlewares/auths');

// Read all items and new Items
route.get('/', authentication, ProductController.getItems);
route.post('/', authentication, ProductController.newItem);

// Get and Edit items by Id
route.get('/:id', authentication, authorization, ProductController.getItemById);
route.put('/:id', authentication, authorization, ProductController.editItemById);

// Edit
route.delete('/:id', authentication, authorization, ProductController.deleteItemById);

module.exports = route;
