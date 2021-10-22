'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      category.belongsTo(models.post_image, {foreignKey: 'imageId'})
      category.belongsTo(models.colors_icons, {foreignKey: 'colorId'})

      category.hasMany(models.post, {foreignKey: 'categoryId'})
    }
  };
  category.init({
    name: DataTypes.STRING,
    imageId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'post_image',
        key: 'id',
      }
    },
    colorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'colors_icons',
        key: 'id',
      }
    },
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};