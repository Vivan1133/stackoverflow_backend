'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.belongsTo(models.Question, {
        foreignKey: "questionId"
      });
      this.hasMany(models.Comment, {
        foreignKey: "commentableId",
        onDelete: "CASCADE",
        constraints: false,
        scope: {
          commentableType: "answer"
        }
      });
      this.hasMany(models.Vote, { 
        foreignKey: "votableId",
        onDelete: "CASCADE",
        constraints: false,
        scope: {
          votableType: "answer"
        }
      });
    }
  }
  Answer.init({
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [20]
      },
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isAccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};