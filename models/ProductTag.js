const { Sequelize,Model, DataTypes } = require('sequelize');
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require('../config/connection.js');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'id'
      },
      tag_id: {
        type: DataTypes.INTEGER,
        references: {
          references: {
            model: Tag,
            key: 'id'
          }
        },
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ProductTag',
  }
);

module.exports = ProductTag;
console.log(ProductTag === sequelize.models.ProductTag); // true
