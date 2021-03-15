'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Manager.belongsTo(models.Role, {foreignKey: 'roleId'})
      Manager.belongsTo(models.Province, {foreignKey: 'provinceId'})
      Manager.belongsTo(models.District, {foreignKey: 'districtId'})
      Manager.belongsTo(models.Commune, {foreignKey: 'communeId'})
    }
  };
  Manager.init({
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Manager',
  });
  return Manager;
};