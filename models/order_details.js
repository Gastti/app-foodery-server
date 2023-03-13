'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order_Details.init({
    user_id: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER,
    discount_id: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order_Details',
    paranoid: true
  });
  return Order_Details;
};