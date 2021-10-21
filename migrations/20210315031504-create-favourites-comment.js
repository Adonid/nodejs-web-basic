'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('favourites_comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commentId: {
        allowNull: false,
        onDelete: "CASCADE",
        type: Sequelize.INTEGER,
        references: {
          model: 'comments_posts',
          key: 'id',
        }
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
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        min: 0,
        max: 5
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('favourites_comments');
  }
};