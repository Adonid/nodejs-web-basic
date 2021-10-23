'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class colors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      colors.hasMany(models.category, {foreignKey: 'colorId'})
      colors.hasMany(models.tag, {foreignKey: 'colorId'})
      colors.hasMany(models.company_description, {foreignKey: 'colorId'})
    }
  };
  colors.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    alias: DataTypes.STRING,
    code: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'colors',
    timestamps: false
  });
  return colors;
};