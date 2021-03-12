'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      configSys: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      addPost: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      delPost: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      writePost: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      addUser: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      delUser: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      writeUser: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      delComment: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('roles');
  }
};