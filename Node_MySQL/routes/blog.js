const express = require("express");
const db = require("../data/database");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/posts");
});

router.get("/posts", (req, res) => {
  res.render("posts-list");
});

router.get("/new-post", async (req, res) => {
  const [authors] = await db.query("SELECT * FROM authors"); //구조분해를 통해 원하는 테이블을 변수에 따로 저장
  console.log(authors);
  res.render("create-post", { authors: authors });
});

module.exports = router;
