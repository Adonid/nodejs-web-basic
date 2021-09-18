'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comments_post.belongsTo(models.post, {foreignKey: 'postId'})
      comments_post.belongsTo(models.user, {foreignKey: 'userId'})

      comments_post.hasMany(models.favourites_comment, {foreignKey: 'commentId'})
      comments_post.hasMany(models.replys_comment, {foreignKey: 'commentId'})
    }
  };
  comments_post.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    marker: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'comments_post',
  });
  return comments_post;
};