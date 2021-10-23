'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tag.belongsToMany(models.post, {
        through: "post_tags",
        foreignKey: 'tagId'
      })
      tag.belongsTo(models.colors, {foreignKey: 'colorId'})
    }
  };
  tag.init({
    name: DataTypes.STRING,
    colorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'colors',
        key: 'id',
      }
    },
  }, {
    sequelize,
    modelName: 'tag',
  });
  return tag;
};