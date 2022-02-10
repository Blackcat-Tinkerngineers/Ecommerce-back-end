const { Sequelize, DataTypes } = require('sequelize');
const db = require("../../models");
const router = require('./product-routes');
const Category = db.Category;
const Product = db.Product;
const Tag = db.Tag;
const ProductTag = db.ProductTag;

router.create = (req, res) => {
  Category.create({
      include: [{
          model: Product,
      }]
  });

router.get('/', (req, res) => { //api/categories endpoint
    Category.findAll({ //find all categories
            include: [{ //include its associated Products
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock']
            }]
        }).then(categoryData => res.json(categoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Category.findOne({ // find one category by its `id` value
        where: { id: req.params.id },
        include: [{
            model: Product,
            attributes:     
        }]
    }).then(categoryData => {
        if (!categoryData) {
            res.status(404).json({ message: 'No category with this id' });
            return;
        }
        res.json(categoryData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Category.create(req.body) //create a new category
        .then((newCategory) => { res.json(newCategory) })
        .catch((err) => { res.json(err); })
});

router.put('/:id', (req, res) => { 
    Category.update({
        category_name: req.body.category_name
    }, { 
        where: { id: req.params.id },
    }).then((updateCategory) => {
        res.json(updateCategory);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    });
});

router.delete('/:id', (req, res) => { 
    Category.destroy({
        where: { id: req.params.id },
    }).then((deleteCategory) => {
        res.json(deleteCategory);
    }).catch((err) => res.json(err));
});




const category = await Category.create({
    category_name: ('Shirts', 'Shorts', 'Music', 'Hats', 'Shoes'),
}, { fields: ['category_name'] });
console.log(category.category_name);

await Category.update({ 
  category_name: ('Shirts', 'Shorts', 'Music', 'Hats', 'Shoes'),
  where: { id: req.params.id }
});

await Category.destroy({ 
  where: {category_name: ('Shirts', 'Shorts', 'Music', 'Hats', 'Shoes'),
}
});






module.exports = router;