const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product, 
        through : ProductTag,
      },
    ],
  })
  .then((dbTagsData) => res.status(200).json(dbTagsData))
  .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
  .then((dbTagsData) => res.status(200).json(dbTagsData))
  .catch((err) => res.status(404).json(err));
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((dbTagsData) => res.status(200).json(dbTagsData))
  .catch((err) => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((dbTagsData) => res.status(200).json(dbTagsData))
  .catch((err) => res.status(404).json(err));
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((dbTagsData) => res.status(200).json(dbTagsData))
  .catch((err) => res.status(404).json(err));
});

module.exports = router;
