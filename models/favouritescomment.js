'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favourites_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      favourites_comment.belongsTo(models.comments_post, {foreignKey: 'commentId'})
      favourites_comment.belongsTo(models.user, {foreignKey: 'userId'})
    }
  };
  favourites_comment.init({
    commentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'favourites_comment',
    timestamps: false
  });
  return favourites_comment;
};