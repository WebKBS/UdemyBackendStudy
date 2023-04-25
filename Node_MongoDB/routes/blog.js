const express = require("express");
const db = require("../data/database");
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", function (req, res) {
  res.render("posts-list");
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDb().collection("authors").find().toArray(); // 저장된 데이터를 가져오는 방법
  res.render("create-post", { authors: authors });
});

module.exports = router;
