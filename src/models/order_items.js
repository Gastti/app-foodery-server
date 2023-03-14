'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order_Items.belongsTo(models.Order_Details, { foreignKey: 'order_id' });
      Order_Items.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }
  Order_Items.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order_Items',
    paranoid: true
  });
  return Order_Items;
};