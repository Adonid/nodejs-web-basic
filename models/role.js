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
    roleName: DataTypes.BOOLEAN,
    configSys: DataTypes.BOOLEAN,
    addPost: DataTypes.BOOLEAN,
    delPost: DataTypes.BOOLEAN,
    writePost: DataTypes.BOOLEAN,
    addUser: DataTypes.BOOLEAN,
    delUser: DataTypes.BOOLEAN,
    writeUser: DataTypes.BOOLEAN,
    delComment: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};