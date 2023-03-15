'use strict';
const { Product, Category } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [
      {
        name: 'Mega Burger',
        desc: 'This is a tasty burger.',
        SKU: 'BGR01',
        category: "Burgers",
        price: 10.5,
        discount_id: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Italian Pizza',
        desc: 'This is a tasty pizza.',
        SKU: 'PZA01',
        category: "Pizzas",
        price: 15,
        discount_id: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fried Chicken',
        desc: 'This is a tasty fried chicken.',
        SKU: 'CHKN01',
        category: "Fries",
        price: 22.9,
        discount_id: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('Products', products, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
