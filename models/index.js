const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
const Product = require("./Product.js")(sequelize, Sequelize);
const Category = require("./Category.js")(sequelize, Sequelize);;
const Tag = require("./Tag.js")(sequelize, Sequelize);;
const ProductTag = require("./ProductTag.js")(sequelize, Sequelize);;
module.exports = db;





Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

Category.hasMany(Product, {
  foreignKey: 'category_id'
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'categories',
  foreignKey: 'product_id'
})

Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'categories',
  foreignKey: 'tag_id'
})


db.sequelize = sequelize;

module.exports =
{
  Product,
  Category,
  Tag,
  ProductTag
};

module.exports = db;
