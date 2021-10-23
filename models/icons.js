'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class icons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      icons.hasMany(models.company_description, {foreignKey: 'iconId'})
    }
  };
  icons.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    alias: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'icons',
    timestamps: false
  });
  return icons;
};