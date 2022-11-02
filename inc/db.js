// get the client
const mysql = require('mysql2');

// dot env for environment variables
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database:process.env.DATABASE,
  multipleStatements: true
});

module.exports = connection;