'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class district extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      district.belongsTo(models.province, {foreignKey: 'provinceId'})
      district.hasMany(models.commune, {foreignKey: 'districtId'})
      district.hasMany(models.user, {foreignKey: 'districtId'})
    }
  };
  district.init(
  {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'district',
    timestamps: false
  });
  return district;
};