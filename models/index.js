// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

// cat can have many products

//product can only belong to one category
// ............ 

// Categories have many Products models
// ............ 

// Products belongToMany Tags (through ProductTag)
// allow products to have multiple tags
// allow tags to have multiple products
// ............ 

// Tags belongToMany Products (through ProductTag)
// ............ 

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

console.log(Product === sequelize.models.Product); // true
console.log(Category === sequelize.models.Category); // true
console.log(Tag === sequelize.models.Tag); // true
console.log(ProductTag === sequelize.models.ProductTag); // true