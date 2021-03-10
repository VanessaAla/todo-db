"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("todoLists", [
      {
        name: "personal list",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        name: "work list",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
      {
        name: "sports list",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("todoLists", null, {});
  },
};
