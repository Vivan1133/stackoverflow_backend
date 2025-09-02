'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userId"
      });
      this.belongsTo(models.Question, {
        foreignKey: "votableId",
        constraints: false
      });
      this.belongsTo(models.Answer, {
        foreignKey: "votableId",
        constraints: false
      });
    } 
  }
  Vote.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    votableId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    votableType: {
      type: DataTypes.ENUM("question", "answer"),
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[-1, 1]]
      }
    }
  }, {
    sequelize,
    modelName: 'Vote',
  });
  return Vote;
};