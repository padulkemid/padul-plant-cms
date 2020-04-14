const { Product } = require('../models');

class ProductController {
  static getItems(req, res, next) {
    Product.findAll()
      .then((products) => {
        res.status(200).json({
          message: 'Success getting products',
          products,
        });
      })
      .catch(next);
  }

  static newItem(req, res, next) {
    const newData = req.body;

    Product.create(newData)
      .then((created) => {
        res.status(201).json({
          message: 'Successfully created new product!',
          created,
        });
      })
      .catch(next);
  }

  static getItemById(req, res, next) {
    const { id } = req.params;

    Product.findOne({
      where: {
        id,
      },
    })
      .then((product) => {
        if (!product) {
          throw new Error(`Data with id ${id}, not found!`);
        } else {
          res.status(200).json({
            message: `Successfully get product by id ${id}`,
            product,
          });
        }
      })
      .catch(next);
  }

  static editItemById(req, res, next) {
    const newData = req.body;
    const { id } = req.params;

    Product.update(newData, {
      where: {
        id,
      },
    })
      .then((success) => {
        res.status(201).json({
          message: `Successfully edited data with id ${id}`,
          success,
        });
      })
      .catch(next);
  }

  static deleteItemById(req, res, next) {
    const { id } = req.params;

    Product.destroy({
      where: {
        id,
      },
    })
      .then((deleted) => {
        res.status(201).json({
          message: `Successfully deleted data with id ${id}`,
          deleted,
        });
      })
      .catch(next);
  }
}

module.exports = ProductController;
