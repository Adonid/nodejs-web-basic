'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(models.PostImage, {foreignKey: 'imageId'})

      Category.hasMany(models.Post, {foreignKey: 'categoryId'})
    }
  };
  Category.init({
    name: DataTypes.STRING,
    imageId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'PostImage',
        key: 'id',
      }
    },
    color: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};