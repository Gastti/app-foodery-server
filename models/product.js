'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Discount, { as: 'discount_coupon', foreignKey: 'discount_id' });
      Product.hasMany(models.Cart_Item, { as: 'cart_items', foreignKey: 'product_id', targetKey: 'id' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    image: DataTypes.STRING,
    SKU: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount_id: DataTypes.INTEGER,
    total_sold: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',
    paranoid: true
  });
  return Product;
};