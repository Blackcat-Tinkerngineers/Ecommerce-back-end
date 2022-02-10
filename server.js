const { sequelize, Category} = require('./models/Category.js');
const { sequelize, Product} = require('./models/Product.js');
const { sequelize, ProductTag} = require('./models/ProductTag.js');
const { sequelize, Tag} = require('./models/Tag.js');
const express = require('express');
const routes = require('./routes');
const mysql = require('mysql2');
const app = express();
const cors = require("cors");
var corsOptions = {
  origin:"http://localhost:5000"
};


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(cors(corsOptions));



app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API games" });
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);  
});

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync with { force: true }');
  db.sequelize.sync();
});

(async () => {
  await sequelize.sync({ force: true });
})();


