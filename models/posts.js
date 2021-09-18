'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      post.belongsTo(models.category, {foreignKey: 'categoryId'})
      post.belongsTo(models.user, {foreignKey: 'authorId'})
      post.belongsTo(models.post_image, {foreignKey: 'imageId'})

      post.hasMany(models.posts_content, {foreignKey: 'postId'})
      post.hasMany(models.favourites_post, {foreignKey: 'postId'})
      post.hasMany(models.comments_post, {foreignKey: 'postId'})

      post.belongsToMany(models.tag, {
        through: "post_tags",
        foreignKey: 'postId'
      })
    }
  };
  post.init({
    title: DataTypes.STRING,
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
    modelName: 'post',
  });
  return post;
};