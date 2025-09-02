'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
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
        foreignKey: "commentableId",
        constraints: false
      })
      this.belongsTo(models.Answer, {
        foreignKey: "commentableId",
        constraints: false
      })
    }
  }
  Comment.init({
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 500] 
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    commentableType: {
      type: DataTypes.ENUM("question", "answer"),
      allowNull: false
    },
    commentableId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};