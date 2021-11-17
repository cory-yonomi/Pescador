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
      models.stream.belongsToMany(models.user, {through: "userStream"})
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