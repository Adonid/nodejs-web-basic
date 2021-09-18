'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favourites_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      favourites_post.belongsTo(models.post, {foreignKey: 'postId'})
      favourites_post.belongsTo(models.user, {foreignKey: 'userId'})
    }
  };
  favourites_post.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    marker: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'favourites_post',
  });
  return favourites_post;
};