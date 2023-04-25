const path = require("path");

const express = require("express");

const blogRoutes = require("./routes/blog");
const db = require("./data/database");
const database = require("./data/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(blogRoutes);

app.use(function (error, req, res, next) {
  console.log(error);
  res.status(500).render("500");
});

db.connectToDatabase().then(function () {
  // 데이터베이스 연결이 완료 되고 난후 서버를 만든다
  app.listen(3000);
});
