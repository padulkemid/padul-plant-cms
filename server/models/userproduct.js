'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserProduct = sequelize.define('UserProduct', {
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {});
  UserProduct.associate = function(models) {
    // associations can be defined here
  };
  return UserProduct;
};