const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => { //api/tags endpoint
    Tag.findAll({ //find all tags
            include: [{ //include its associated Products
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock']
            }]
        }).then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Tag.findOne({ //find a single tag by its `id`
        where: { id: req.params.id },
        include: [{ // be sure to include its associated Product data
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }]
    }).then(tagData => {
        if (!tagData) {
            res.status(404).json({ message: 'No tag with this id' });
            return;
        }
        res.json(tagData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Tag.create(req.body) //create a new tag
        .then((newTag) => { res.json(newTag) })
        .catch((err) => { res.json(err); })
});

router.put('/:id', (req, res) => {
    Tag.update({
        tag_name: req.body.tag_name
    }, { //update Tag base on tag id
        where: { id: req.params.id },
    }).then((updateTag) => {
        res.json(updateTag);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    });
});

router.delete('/:id', (req, res) => {
    Tag.destroy({
        where: { id: req.params.id },
    }).then((deleteTag) => {
        res.json(deleteTag);
    }).catch((err) => res.json(err));
});

module.exports = router;