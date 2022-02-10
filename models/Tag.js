const { Sequelize, Model, DataTypes } = require ('sequelize');
const sequelize = require('../config/connection.js.js.js');
const sequelize = new Sequelize('sqlite::memory:');

class Tag extends Model { }

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  });

  (async () => {
    await sequelize.sync({ force: true });
  })();

module.exports= Tag;
console.log(Tag === sequelize.models.tag); // true