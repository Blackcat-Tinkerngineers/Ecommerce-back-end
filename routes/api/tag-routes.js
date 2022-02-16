const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: ['Product', 'ProductTag'],
        attributes: ['product_name', 'price', 'stock', 'product_id', 'tag_id'],
      },
    ],
  })
    .then((dbTagsData) => res.status(200).json(dbTagsData))
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: ['Product', 'ProductTag'],
        attributes: ['product_name', 'price', 'stock', 'product_id', 'tag_id'],
      },
    ],
  })
    .then(dbTagsData => res.status(200).json(dbTagsData))
    .catch((err) => res.status(404).json(err));
});

router.post('/', (req, res) => {
  Tag.create({
    id: req.body.id,
    tag_name: req.body.tag_name,
  })
    .then((dbTagsData) => res.status(200).json(dbTagsData))
    .catch((err) => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      id: req.params.id,
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
        tag_name: req.body.tag_name,
      },
    })
    .then((dbTagsData) => res.status(200).json(dbTagsData))
    .catch((err) => res.status(404).json(err));
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
      tag_name: req.params.tag_name,
    },
  })
    .then((dbTagsData) => res.status(200).json(dbTagsData))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
