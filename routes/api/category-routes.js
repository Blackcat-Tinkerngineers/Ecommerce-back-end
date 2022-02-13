const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id','category_id','category_name','product_name', 'price','stock','tag_name'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: ['Category','Product','ProductTag','Tag'],
        attributes: ['id','category_id','category_name','product_name', 'price','stock','tag_name'],
      }
    ],
  })
    .then (dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id','category_name','product_name', 'price','stock','category_id','tag_name'],
    include: [
      {
        model: ['Category','Product','ProductTag','Tag'],
        attributes: ['id','category_name','product_name', 'price','stock','category_id','tag_name'],
      }
    ],
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Category.create ({
    id: req.body.id,
    category_name: req.body.category_name,
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    tag_name: req.body.tag_name,
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
  }
    res.json(dbCategoryData);
    })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name,
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
      tag_name: req.body.tag_name,
  },
  {
    where: {
      id: req.params.id,
      category_name: req.params.category_name,
      product_name: req.params.product_name,
      price: req.params.price,
      stock: req.params.stock,
      category_id: req.params.category_id,
      tag_name: req.params.tag_name,
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500.).json(err);
  });
});

router.delete('/:id', (req, res) => {
    Category.destroy({
      where: {
        id: req.params.id,
      }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;
