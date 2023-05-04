const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../data/database");
const { use } = require("bcrypt/promises");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", async function (req, res) {
  let sessionInputData = req.session.inputData;

  // 세션의 사용자 데이터 검증
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      confirmEmail: "",
      password: "",
    };
  }

  // 새로고침이나 다른 페이지 이동후 inputData를 초기화 한다. (세션 초기화)
  req.session.inputData = null;

  // inputData 내보내기
  res.render("signup", { inputData: sessionInputData });
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
    req.session.inputData = {
      hasError: true,
      message: "잘못된 입력입니다.",
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };

    req.session.save(function () {
      return res.redirect("/signup");
    });

    // 서버 충돌하지 않기 위해서 여기서 리턴해줘야한다.
    return;
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

router.get("/admin", async function (req, res) {
  // 사용자 session이 isAuthenticated가 아니라면
  if (!req.session.isAuthenticated) {
    // if(!req.session.user) user를 검색할때 대체 가능함
    return res.status(401).render("401");
  }

  const user = await db
    .getDb()
    .collection("users")
    .findOne({ _id: req.session.user.id });
  if (!user || !user.isAdmin) {
    return res.status(403).render("403");
  }

  res.render("admin");
});
router.get("/profile", function (req, res) {
  // 사용자 session이 isAuthenticated가 아니라면
  if (!req.session.isAuthenticated) {
    // if(!req.session.user) user를 검색할때 대체 가능함
    return res.status(401).render("401");
  }
  res.render("profile");
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
});

module.exports = router;
