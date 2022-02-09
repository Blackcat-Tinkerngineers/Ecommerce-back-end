const router = require('express').Router();
const express = require('express');
const { Category, Product } = require('../../models');

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
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
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

router.put('/:id', (req, res) => { //update a category by its `id` value
    Category.update({
        category_name: req.body.category_name
    }, { //update category base on category id
        where: { id: req.params.id },
    }).then((updateCategory) => {
        res.json(updateCategory);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    });
});

router.delete('/:id', (req, res) => { //delete a category by id
    Category.destroy({
        where: { id: req.params.id },
    }).then((deleteCategory) => {
        res.json(deleteCategory);
    }).catch((err) => res.json(err));
});

module.exports = router;