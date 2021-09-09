'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('favouritesPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        onDelete: "CASCADE",
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      postId: {
        allowNull: false,
        onDelete: "CASCADE",
        type: Sequelize.INTEGER,
        references: {
          model: 'posts',
          key: 'id',
        }
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        min: 0,
        max: 5
      },
      marker: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('favouritesPosts');
  }
};