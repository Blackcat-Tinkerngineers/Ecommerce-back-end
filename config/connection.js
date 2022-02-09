require('dotenv').config();
const Sequelize = require('sequelize');
const mysql = require('mysql2');


  const sequelize = new Sequelize
  ('blackcat_ecomm_db', 'username', 'password', {
    username: 'localhost',
    dialect: 'mysql',
    port: '3306',
  });

module.exports=sequelize;
