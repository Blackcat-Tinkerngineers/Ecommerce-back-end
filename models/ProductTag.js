const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = require('../config/connection'); 
const sequelize = new Sequelize('sqlite::memory:');

class ProductTag extends Model {} 

ProductTag.init({ 
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'product',
            key: 'id'
        }
    },
    tag_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tag',
            key: 'id'
        }
    }
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
});

(async () => {
    await sequelize.sync({ force: true });
    // Code here
  })();

module.exports = ProductTag;

console.log(ProductTag === sequelize.models.product_tag); // true