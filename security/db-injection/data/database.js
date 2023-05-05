const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DATA_HOST,
  database: process.env.DATA_NAME,
  user: "root",
  password: process.env.DATA_PW,
});

module.exports = pool;
