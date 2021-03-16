'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostsContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PostsContent.belongsTo(models.Post, {foreignKey: 'postId'})
    }
  };
  PostsContent.init({
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PostsContent',
  });
  return PostsContent;
};