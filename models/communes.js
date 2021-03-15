'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commune extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Commune.belongsTo(models.District, {foreignKey: 'districtId'})
      Commune.hasMany(models.Manager, {foreignKey: 'communeId'})
      Commune.hasMany(models.User, {foreignKey: 'communeId'})
    }
  };
  Commune.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Commune',
  });
  return Commune;
};