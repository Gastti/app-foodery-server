'use strict';
const bcryptjs = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let user = {
      first_name: "User",
      last_name: "Test",
      username: "usertest01",
      email: "usertest01@foodery.com",
      password: "123456",
      telephone: 123401,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const salt = bcryptjs.genSaltSync(15);
    user.password = bcryptjs.hashSync(user.password, salt);

    await queryInterface.bulkInsert('Users', [user], {});
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
