'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      {
        name: 'Pizza',
        desc: 'This is a description.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Burger',
        desc: 'This is a description.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chicken',
        desc: 'This is a description.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('Categories', categories, {});
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
