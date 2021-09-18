'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favourites_reply_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      favourites_reply_comment.belongsTo(models.replys_comment, {foreignKey: 'commentId'})
      favourites_reply_comment.belongsTo(models.user, {foreignKey: 'userId'})
    }
  };
  favourites_reply_comment.init({
    replyCommentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'favourites_reply_comment',
    timestamps: false
  });
  return favourites_reply_comment;
};