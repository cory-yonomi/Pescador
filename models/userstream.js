'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userStream extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userStream.init({
    userId: DataTypes.INTEGER,
    streamId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userStream',
  });
  return userStream;
};