const express = require('express');
const routes = require('./routes');
const mysql = require('mysql2');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});



const app = express();
const PORT = process.env.PORT || 3001;

