'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  trip.init({
    userId: DataTypes.INTEGER,
    streamId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    weather: DataTypes.STRING,
    description: DataTypes.STRING,
    fishCaught: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'trip',
  });
  return trip;
};