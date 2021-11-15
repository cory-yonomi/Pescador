'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stream extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.stream.belongsTo(models.user)
      models.stream.belongsToMany(models.fish, {through: "UserFish"})
      models.stream.belongsToMany(models.trip, {through: "tripStream"})
    }
  };
  stream.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    longitude: DataTypes.DECIMAL,
    latitude: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'stream',
  });
  return stream;
};