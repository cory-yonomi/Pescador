'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.fish.belongsTo(models.user)
      models.fish.belongsTo(models.trip)
      models.fish.belongsTo(models.stream)
    }
  };
  fish.init({
    userId: DataTypes.INTEGER,
    tripId: DataTypes.INTEGER,
    species: DataTypes.STRING,
    length: DataTypes.DECIMAL,
    weight: DataTypes.DECIMAL,
    caughtWith: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fish',
  });
  return fish;
};