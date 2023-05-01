const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", async function (req, res) {
  res.render("signup");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/signup", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // userData['email']
  const enteredConfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;

  // 유효성 추가
  if (
    !enteredEmail ||
    !enteredConfirmEmail ||
    !enteredPassword ||
    enteredPassword.trim() < 6 ||
    enteredEmail !== enteredConfirmEmail ||
    !enteredEmail.includes("@")
  ) {
    alert("유효성 실패!!");
    return res.redirect("/signup");
  }

  // 이미 이메일이 등록된 유저가 있을 경우 리턴
  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (existingUser) {
    console.log("이미 사용중인 유저입니다.");
    return res.redirect("/signup");
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  console.log(userData);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };

  await db.getDb().collection("users").insertOne(user);

  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // userData['email']
  const enteredPassword = userData.password;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  // 유저가 없는 경우
  if (!existingUser) {
    console.log("로그인 할수 없습니다.");
    return res.redirect("/login");
  }

  // bcrypt를 사용해서 password가 일치하는지 검증한다.
  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!passwordsAreEqual) {
    console.log("패스워드가 다릅니다!!");
    return res.redirect("/login");
  }

  // 사용자 세션 등록
  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    // session 저장 후 redirect함
    console.log("세션 저장 성공!");
    res.redirect("/admin");
  });

  console.log("로그인 성공!!");
});

router.get("/admin", function (req, res) {

  // 사용자 session이 isAuthenticated가 아니라면
  if (!req.session.isAuthenticated) {
    // if(!req.session.user) user를 검색할때 대체 가능함
    return res.status(401).render("401");
  }
  res.render("admin");
});

router.post("/logout", function (req, res) {});

module.exports = router;
