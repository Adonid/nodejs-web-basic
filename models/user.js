'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsTo(models.role, {foreignKey: 'roleId'})
      user.belongsTo(models.province, {foreignKey: 'provinceId'})
      user.belongsTo(models.district, {foreignKey: 'districtId'})
      user.belongsTo(models.commune, {foreignKey: 'communeId'})

      user.hasMany(models.post, {foreignKey: 'authorId'})
      user.hasMany(models.favourites_post, {foreignKey: 'userId'})
      user.hasMany(models.comments_post, {foreignKey: 'userId'})
      user.hasMany(models.favourites_comment, {foreignKey: 'userId'})
      user.hasMany(models.replys_comment, {foreignKey: 'userId'})
      user.hasMany(models.favourites_reply_comment, {foreignKey: 'userId'})
      user.hasMany(models.user_image, {foreignKey: 'userId'})
      user.hasMany(models.post_image, {foreignKey: 'userId'})
    }
  };
  user.init({
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
    member: DataTypes.BOOLEAN,
    provider: DataTypes.STRING,
    social: DataTypes.JSON,
    fullName: DataTypes.STRING,
    codeReset: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    bio: DataTypes.TEXT,
    age: DataTypes.STRING,
    genre: DataTypes.STRING,
    work: DataTypes.STRING,
    skill: DataTypes.JSON,
    linkSocials: DataTypes.JSON,
    address: DataTypes.TEXT,
    marker: DataTypes.BOOLEAN,
    provinceId: DataTypes.INTEGER,
    districtId: DataTypes.INTEGER,
    communeId: DataTypes.INTEGER,
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'role',
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
    modelName: 'user',
  });
  return user;
};