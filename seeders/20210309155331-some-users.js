"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "theuns breytenbach",
          email: "theuns@hotmail.com",
          phone: 1234,
          password: "123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "vanessa ala",
          email: "vanessa@hotmail.com",
          phone: 1234,
          password: "123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
