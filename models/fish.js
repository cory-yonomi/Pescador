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
      models.fish.belongsToMany(models.user, { through: "UserFish" })
      models.fish.belongsToMany(models.stream, { through: "StreamFish"})
    }
  };
  fish.init({
    userId: DataTypes.INTEGER,
    species: DataTypes.STRING,
    length: DataTypes.DECIMAL,
    weight: DataTypes.DECIMAL,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fish',
  });
  return fish;
};