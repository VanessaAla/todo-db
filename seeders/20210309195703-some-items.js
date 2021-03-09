"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("todoItems", [
      {
        task: "Finish work",
        deadline: "Tomorrow",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        task: "Laundry",
        deadline: "Tomorrow",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        task: "Clean room",
        deadline: "Today",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("todoItems", null, {});
  },
};
