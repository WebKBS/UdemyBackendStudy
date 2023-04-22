const mysql = require("mysql2/promise"); // promise를 사용하기위해 promise설정
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  database: "blog",
  user: "root",
  password: process.env.DATA_KEY,
});

module.exports = pool;
