const route = require('express').Router();
const ProductController = require('../controllers/product');

// Read all items and new Items
route.get('/', ProductController.getItems);
route.post('/', ProductController.newItem);

// Get and Edit items by Id
route.get('/:id', ProductController.getItemById);
route.put('/:id', ProductController.editItemById);

// Edit
route.delete('/:id', ProductController.deleteItemById);

module.exports = route;
