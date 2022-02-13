const router = require('express').Router();
const res = require('express/lib/response');
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', (req, res) => {
 Product.findAll({
  attributes: ['id','product_name', 'price','stock','category_id'],
  order: [['created_at', 'DESC']],
  include: [ Category,
    {
      modle: ['Product','ProductTag'],
      attributes: ['id','product_name', 'price','stock','category_id','product_id','tag_id'],
    },
  ],
})
  .then(dbProductData => res.json(dbProductData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id','product_name', 'price','stock','category_id'],
    order: [['created_at', 'DESC']],
    include: [ Category,
      {
        modle: ['Product','ProductTag'],
        attributes: ['id','product_name', 'price','stock','category_id','product_id','tag_id'],
      },
    ],
  })
 .then((dbProductData) => {
   if (!dbProductData) {
     res.status(404).json({ message: 'No product found with this id' });
     return;
 }
 res.json(dbProductData);
})
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Product.create ({
    id: req.body.id,
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    product_id: req.body.product_id,
    tag_id: req.body.tag_id,
  })
    .then((dbProductData) => {
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
    }
    res.json(dbProductData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
    });

router.put('/:id', (req, res) => {
  Product.update(
    {
      id: req.body.id,
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
      product_id: req.body.product_id,
      tag_id: req.body.tag_id,
    },
    {
      where: {
        id: req.params.id,
        product_name: req.params.product_name,
        price: req.params.price,
        stock: req.params.stock,
        category_id: req.params.category_id,
        product_id: req.params.product_id,
        tag_id: req.params.tag_id,
      }
  })
    .then((dbProductData) => {
    if (!dbProductData) {
      res.status(404).json({ message: 'No product found with this id' });
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    }
    res.json(dbProductData);
    })
    .then((productTags) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id: tag_id,
          };
        });
        ProductTag.bulkCreate(productTagIdArr, { individualHooks: true })
          .then((productTags) => {
            res.json(productTags);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      } else {
        ProductTag.destroy({ where: { product_id: req.params.id } })
          .then((productTags) => {
            res.json(productTags);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
      });

router.delete('/:id', (req, res) => {
  Product.destroy(
    {
      id: req.body.id,
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
      product_id: req.body.product_id,
      tag_id: req.body.tag_id,
    },{
      where: {
        id: req.params.id,
        product_name: req.params.product_name,
        price: req.params.price,
        stock: req.params.stock,
        category_id: req.params.category_id,
        product_id: req.params.product_id,
        tag_id: req.params.tag_id,
    },
  })
  .then((dbProductData) => {
    if (!dbProductData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(dbProductData);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;
