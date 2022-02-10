const { Sequelize,Model, DataTypes } = require('sequelize');
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Category',
  }
);

console.log(Category === sequelize.models.Category); // true
module.exports = Category;
