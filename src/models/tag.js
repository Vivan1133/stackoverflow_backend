'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Question, {
        through: models.QuestionTag,
        foreignKey: "tagId",
        otherKey: "questionId"
      })
    }
  }
  Tag.init({
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 50] 
    }
  }}, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};