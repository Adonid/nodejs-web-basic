'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commune extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      commune.belongsTo(models.district, {foreignKey: 'districtId'})
      commune.hasMany(models.user, {foreignKey: 'communeId'})
    }
  };
  commune.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'commune',
    timestamps: false
  });
  return commune;
};