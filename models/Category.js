const sequelize = require("sequelize")
const { sequelize, Model, DataTypes } = require ('sequelize');
const sequelize = require ('../config/db.config.js');
const { Sequelize } = require("./index.js");


class Category extends Model {}
Category.init({
    id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name:{
      type: DataTypes.STRING,
      allowNull: false

    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  });

module.exports= Category;
console.log(Category === sequelize.Model.category); // true