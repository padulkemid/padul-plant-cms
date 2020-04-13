'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: {
            msg: 'Product name cannot be empty!',
          },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: {
            msg: 'Image URL cannot be empty!',
          },
          isUrl: {
            msg: 'Please input a valid URL!',
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: false,
          notEmpty: {
            msg: 'Price cannot be empty!',
          },
          isInt: {
            msg: 'Price must be a number!',
          },
          min: {
            args: 0,
            msg: 'Price cannot be lower than zero!',
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: false,
          notEmpty: {
            msg: 'Stock cannot be empty, if stocks are depleted please input 0',
          },
          min: {
            args: 0,
            msg: 'Cannot be more lower than zero!',
          },
        },
      },
    },
    { sequelize }
  );
  Product.associate = function (models) {
    Product.belongsTo(models.UserProduct);
  };
  return Product;
};

