'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.hasMany(models.Cart_Item, {
        as: 'cart_items',
        foreignKey: 'cart_id',
        targetKey: 'id'
      })
    }
  }
  Cart.init({
    user_id: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Cart',
    paranoid: true
  });
  return Cart;
};