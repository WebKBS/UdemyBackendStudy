const express = require("express");
const db = require("../data/database");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/posts");
});

router.get("/posts", async (req, res) => {
  const query = `
    SELECT posts.*, authors.name AS author_name FROM posts 
    INNER JOIN authors ON posts.author_id = authors.id
  `;
  const [posts] = await db.query(query);
  console.log(posts);
  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async (req, res) => {
  const [authors] = await db.query("SELECT * FROM authors"); //구조분해를 통해 원하는 테이블을 변수에 따로 저장

  res.render("create-post", { authors: authors });
});

router.post("/posts", async (req, res) => {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  await db.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUES (?)",
    [data]
  );
  res.redirect("/posts");
});

router.get("/posts/:id", async (req, res) => {
  const query = `
    SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts
    INNER JOIN authors ON posts.author_id = authors.id
    WHERE posts.id = ?
  `;

  const [posts] = await db.query(query, [req.params.id]);

  // db내용이 없을때 404페이지로 이동
  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }

  const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humanReadableDate: posts[0].date.toLocaleDateString("ko", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  res.render("post-detail", { post: postData });
});

router.get("/posts/:id/edit", async (req, res) => {
  const query = `
    SELECT * FROM posts WHERE id = ?
  `;

  const [posts] = await db.query(query, [req.params.id]);

  // db내용이 없을때 404페이지로 이동
  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }

  res.render("update-post", { post: posts[0] });
});

module.exports = router;
