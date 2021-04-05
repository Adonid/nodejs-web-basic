'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Province.hasMany(models.District, {foreignKey: 'provinceId'})
      Province.hasMany(models.User, {foreignKey: 'provinceId'})
    }
  };
  Province.init(
  {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Province',
    timestamps: false
  });
  return Province;
};