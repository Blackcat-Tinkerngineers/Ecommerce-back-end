const { Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const sequelize = new Sequelize('sqlite::memory:');

class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [2, 10]
        },
        category_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'category',
            key: 'id'
          }
        },
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  });

(async () => {
    await sequelize.sync({ force: true });
  })();  

module.exports = Product;

console.log(Product === sequelize.models.product); // true