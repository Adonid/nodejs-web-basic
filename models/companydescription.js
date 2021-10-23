'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class company_description extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      company_description.belongsTo(models.colors_icons, {foreignKey: 'colorId'})
      company_description.belongsTo(models.icons, {foreignKey: 'iconId'})
    }
  };
  company_description.init({
    name: DataTypes.STRING,
    colorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'colors_icons',
        key: 'id',
      }
    },
    iconId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'icons',
        key: 'id',
      }
    },
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'company_description',
  });
  return company_description;
};