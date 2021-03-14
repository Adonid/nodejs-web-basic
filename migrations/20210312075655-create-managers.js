'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('managers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true,
        unique: true,
        len: [8,32],
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [0,16],
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: true,
        len: [0,32],
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        len: [10,12],               // Ex: 0987654321 or 84987654321 or +84987654321
      },
      avatarUrl: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      socials:{
        type: Sequelize.JSON,
        allowNull: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      provinceId: {
        type: Sequelize.INTEGER,
        defaultValue: '0',
        references: {
          model: 'provinces',
          key: 'id',
        }
      },
      districtId: {
        type: Sequelize.INTEGER,
        defaultValue: '0',
        references: {
          model: 'districts',
          key: 'id',
        }
      },
      communeId: {
        type: Sequelize.INTEGER,
        defaultValue: '10615',
        references: {
          model: 'communes',
          key: 'id',
        }
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: 'roles',
          key: 'id',
        }
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
    await queryInterface.dropTable('managers');
  }
};