require('dotenv').config();
const Sequelize = require('sequelize');



  const sequelize = new Sequelize
  (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {

    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
  });

module.exports=sequelize;
