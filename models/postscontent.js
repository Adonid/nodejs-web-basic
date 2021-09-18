'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts_content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      posts_content.belongsTo(models.post, {foreignKey: 'postId'})
    }
  };
  posts_content.init({
    postId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    marker: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'posts_content',
  });
  return posts_content;
};