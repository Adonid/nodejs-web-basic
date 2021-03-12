'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Managers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Managers.init({
    email: DataTypes.STRING,
    pasword: DataTypes.STRING,
    userName: DataTypes.STRING,
    idRole: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Managers',
  });
  return Managers;
};