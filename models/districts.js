'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      District.belongsTo(models.Province, {foreignKey: 'provinceId'})
      District.hasMany(models.Commune, {foreignKey: 'districtId'})
      District.hasMany(models.User, {foreignKey: 'districtId'})
    }
  };
  District.init(
  {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'District',
  });
  return District;
};