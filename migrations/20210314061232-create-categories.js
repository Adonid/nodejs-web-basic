'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'post_images',
          key: 'id',
        }
      },
      colorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'colors',
          key: 'id',
        }
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categories');
  }
};