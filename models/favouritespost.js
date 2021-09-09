'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavouritesPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FavouritesPost.belongsTo(models.Post, {foreignKey: 'postId'})
      FavouritesPost.belongsTo(models.User, {foreignKey: 'userId'})
    }
  };
  FavouritesPost.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    marker: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'FavouritesPost',
  });
  return FavouritesPost;
};