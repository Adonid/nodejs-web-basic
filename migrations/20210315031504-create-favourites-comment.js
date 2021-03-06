'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('favouritesComments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'commentsposts',
          key: 'id',
        }
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        min: 1,
        max: 5
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('favouritesComments');
  }
};