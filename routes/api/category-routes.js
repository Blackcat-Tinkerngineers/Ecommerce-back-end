const router = require('express').Router();
const { Category, Product, ProductTag, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [{
    model: ['Category','Product','Tag','ProductTag'],
    attributes: ['id', 'product_name','price','stock','category_id','tag_id','tag_name'],
    }]
  })
  .then(blackcat_ecomm_db => res.json(blackcat_ecomm_db))
    .catch(err => { 
      console.log(err);
      res.status(500).json({ message: ' 🤬 Internal server error ☠️' });
    });
});
router.get('/:id', (req, res) => {
  Category.findOne({
    model: []
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
