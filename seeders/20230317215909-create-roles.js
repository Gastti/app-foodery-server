'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = [
      { name: 'Administrador', desc: '', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Supervisor', desc: '', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Seller', desc: '', createdAt: new Date(), updatedAt: new Date() },
      { name: 'User', desc: '', createdAt: new Date(), updatedAt: new Date() }
    ]

    await queryInterface.bulkInsert('Roles', roles, {});
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
