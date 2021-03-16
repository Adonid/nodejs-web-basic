'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {foreignKey: 'roleId'})
      User.belongsTo(models.Province, {foreignKey: 'provinceId'})
      User.belongsTo(models.District, {foreignKey: 'districtId'})
      User.belongsTo(models.Commune, {foreignKey: 'communeId'})

      User.hasMany(models.Post, {foreignKey: 'authorId'})
      User.hasMany(models.FavouritesPost, {foreignKey: 'userId'})
      User.hasMany(models.CommentsPost, {foreignKey: 'userId'})
      User.hasMany(models.FavouritesComment, {foreignKey: 'userId'})
      User.hasMany(models.ReplysComment, {foreignKey: 'userId'})
      User.hasMany(models.FavouritesReplyComment, {foreignKey: 'userId'})
    }
  };
  User.init({
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};