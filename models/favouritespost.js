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
      // define association here
    }
  };
  FavouritesPost.init({
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FavouritesPost',
  });
  return FavouritesPost;
};