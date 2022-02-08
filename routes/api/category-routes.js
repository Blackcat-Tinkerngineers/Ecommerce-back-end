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
    include: [{
      model: ['Category','Product','Tag','ProductTag'],
      attributes: ['id', 'product_name','price','stock','category_id','tag_id','tag_name'],
      }]
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Category.create(req.body)
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData[0]) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.delete('/:id', (req, res) => {
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbCategoryData => {
        if (!dbCategoryData) {
          res.status(404).json({ message: 'No product found with this id' });
          return;
        }
        res.json(dbCategoryData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;
