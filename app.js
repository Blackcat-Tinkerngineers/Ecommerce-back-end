const { sequelize, Category} = require('./models/Category');
const express = require('express');
const routes = require('./routes');
const mysql = require('mysql2');
const app = express();

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const Product = require('./Product');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.post('catergories', async(req, res) => {
  const { id, category_name} = req.body

  try {
    const category = await Category.create({id, category_name})
    return res.json(category)
  } catch(err){
    console.log(err)
    return res.status(500).json( err)
  }
})



app.listen({PORT:5000}, async () => {
  console.log('Now listening on server http://localhost:5000')
await sequelize.sync({ force: true })
console.log('Database has been synced')
  
});




