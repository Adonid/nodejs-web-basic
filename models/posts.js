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
      Post.belongsTo(models.Category, {foreignKey: 'categoryId'})
      Post.belongsTo(models.User, {foreignKey: 'authorId'})
      Post.belongsTo(models.PostImage, {foreignKey: 'imageId'})

      Post.hasMany(models.PostsContent, {foreignKey: 'postId'})
      Post.hasMany(models.FavouritesPost, {foreignKey: 'postId'})
      Post.hasMany(models.CommentsPost, {foreignKey: 'postId'})

      Post.belongsToMany(models.Tag, {
        through: "PostTags",
        foreignKey: 'postId'
      })
    }
  };
  Post.init({
    title: DataTypes.STRING,
<<<<<<< HEAD
    image: DataTypes.JSON,
=======
>>>>>>> admin
    desc: DataTypes.TEXT,
    readTime: DataTypes.TEXT,
    draft: DataTypes.BOOLEAN,
    remove: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN,
    imageId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    marker: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};