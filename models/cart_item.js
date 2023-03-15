'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Cart_Item.hasMany(models.Product, { as: 'product', foreignKey: 'product_id', targetKey: 'id' })
      Cart_Item.belongsTo(models.Product, { as: 'product', foreignKey: 'product_id', targetKey: 'id' })
    }
  }
  Cart_Item.init({
    cart_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart_Item'
  });
  return Cart_Item;
};