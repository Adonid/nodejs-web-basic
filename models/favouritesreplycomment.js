'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavouritesReplyComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReplysComment.belongsTo(models.ReplysComment, {foreignKey: 'commentId'})
      ReplysComment.belongsTo(models.User, {foreignKey: 'userId'})
    }
  };
  FavouritesReplyComment.init({
    replyCommentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'FavouritesReplyComment',
  });
  return FavouritesReplyComment;
};