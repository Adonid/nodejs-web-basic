'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class colors_icons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      colors_icons.hasMany(models.category, {foreignKey: 'colorId'})
      colors_icons.hasMany(models.tag, {foreignKey: 'colorId'})
      colors_icons.hasMany(models.company_description, {foreignKey: 'colorId'})
      colors_icons.hasMany(models.company_description, {foreignKey: 'iconId'})
    }
  };
  colors_icons.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    alias: DataTypes.STRING,
    code: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'colors_icons',
    timestamps: false
  });
  return colors_icons;
};