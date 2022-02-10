const { Sequelize,Model, DataTypes } = require('sequelize');
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require('../config/connection.js');
class Tag extends Model {}

Tag.init(
  {
    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    tag_name: {
      type: DataTypes.STRING
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Tag',
  }
);

module.exports = Tag;
console.log(Tag === sequelize.models.tag); // true
