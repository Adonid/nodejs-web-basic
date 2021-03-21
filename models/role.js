'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.hasMany(models.User, {foreignKey: 'roleId'})
    }
  };
  Role.init({
    roleName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    configSys: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    addPost: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    delPost: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    writePost: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    addUser: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    delUser: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    writeUser: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    delComment: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};