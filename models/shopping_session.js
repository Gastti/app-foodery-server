'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shopping_Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shopping_Session.hasMany(models.Cart_Item, {
        as: 'cart_items',
        foreignKey: 'session_id',
        targetKey: 'id'
      })
    }
  }
  Shopping_Session.init({
    user_id: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Shopping_Session',
    paranoid: true
  });
  return Shopping_Session;
};