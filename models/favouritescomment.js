'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavouritesComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FavouritesComment.belongsTo(models.CommentsPost, {foreignKey: 'commentId'})
      FavouritesComment.belongsTo(models.User, {foreignKey: 'userId'})
    }
  };
  FavouritesComment.init({
    commentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FavouritesComment',
  });
  return FavouritesComment;
};