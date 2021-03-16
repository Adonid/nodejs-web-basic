'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Categorie, {foreignKey: 'categoryId'})
      Post.belongsTo(models.User, {foreignKey: 'authorId'})

      Post.hasMany(models.PostsContent, {foreignKey: 'postId'})
      Post.hasMany(models.FavouritesPost, {foreignKey: 'postId'})
      Post.hasMany(models.CommentsPost, {foreignKey: 'postId'})
    }
  };
  Post.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};