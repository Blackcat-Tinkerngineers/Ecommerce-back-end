const { Model, DataTypes } = require('sequelize'); //import Model class from Sequelize
const sequelize = require('../config/connection'); //import db connection 

class ProductTag extends Model {} //init ProductTag model by extending Sequelize Model class

ProductTag.init({ //initialize ProductTag class
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
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
});

module.exports = ProductTag;