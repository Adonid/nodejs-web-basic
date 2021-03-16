'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReplysComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReplysComment.belongsTo(models.CommentsPost, {foreignKey: 'commentId'})
      ReplysComment.belongsTo(models.User, {foreignKey: 'userId'})

      ReplysComment.hasMany(models.FavouritesReplyComment, {foreignKey: 'replyCommentId'})
    }
  };
  ReplysComment.init({
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReplysComment',
  });
  return ReplysComment;
};