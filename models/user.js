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
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    provider: DataTypes.STRING,
    social: DataTypes.JSON,
    fullName: DataTypes.STRING,
    codeReset: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    avatar: DataTypes.JSON,
    bio: DataTypes.TEXT,
    linkSocials: DataTypes.JSON,
    address: DataTypes.TEXT,
    provinceId: DataTypes.INTEGER,
    districtId: DataTypes.INTEGER,
    communeId: DataTypes.INTEGER,
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'Role',
        key: 'id',
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};