'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      teamName: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  }
}