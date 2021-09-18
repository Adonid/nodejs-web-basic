'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class replys_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      replys_comment.belongsTo(models.comments_post, {foreignKey: 'commentId'})
      replys_comment.belongsTo(models.user, {foreignKey: 'userId'})

      replys_comment.hasMany(models.favourites_reply_comment, {foreignKey: 'replyCommentId'})
    }
  };
  replys_comment.init({
    commentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    reply: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'replys_comment',
  });
  return replys_comment;
};