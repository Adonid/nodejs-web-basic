'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentsPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CommentsPost.belongsTo(models.Post, {foreignKey: 'postId'})
      CommentsPost.belongsTo(models.User, {foreignKey: 'userId'})

      CommentsPost.hasMany(models.FavouritesComment, {foreignKey: 'commentId'})
      CommentsPost.hasMany(models.ReplysComment, {foreignKey: 'commentId'})
    }
  };
  CommentsPost.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    marker: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'CommentsPost',
  });
  return CommentsPost;
};