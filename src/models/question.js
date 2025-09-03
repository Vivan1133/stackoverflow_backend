'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
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
      this.hasMany(models.Answer, {
        foreignKey: "questionId",
        onDelete: "CASCADE"
      });
      this.hasMany(models.Comment, {
        foreignKey: "commentableId",
        onDelete: "CASACDE",
        constraints: false,
        scope: {
          commentableType: "question"
        }
      });
      this.hasMany(models.Vote, {
        foreignKey: "votableId",
        onDelete: "CASCADE",
        constraints: false,
        scope: {
          votableType: "question"
        },
      });
      this.belongsToMany(models.Tag, {
        through: models.QuestionTag,
        onDelete: "CASCADE",
        foreignKey: "questionId",
        otherKey: "tagId"
      });
    }
  }
  Question.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 255]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [20, 400] 
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};

