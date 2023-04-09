const fs = require("fs");

const path = require("path");
const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views")); // 사용할 폴더 이름 지정
app.set("view engine", "ejs"); // ejs사용 하겠다는 set 지정

app.use(express.static("public")); // css 및 javascript를 사용하려면 반드시 써줘야한다.
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "index.html");
  // res.sendFile(htmlFilePath);
  res.render("index");
});

app.get("/restaurants", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  // res.sendFile(htmlFilePath);

  const filePath = path.join(__dirname, "data", "restaurants.json"); // 파일 저장된 위치

  const fileData = fs.readFileSync(filePath); // 파일 읽기
  const storeRestaurants = JSON.parse(fileData); // JSON으로 전환

  res.render("restaurants", {
    numberOfRestaurants: storeRestaurants.length,
    restaurants: storeRestaurants,
  });
});

app.get("/restaurants/:id", (req, res) => {
  // 아이디 설정한 페이지
  const restaurantId = req.params.id; // .id는 :id와 이름이 같아야한다.
  res.render("restaurants-detail", { rid: restaurantId });
});

app.get("/recommend", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  // res.sendFile(htmlFilePath);
  res.render("recommend");
});

app.post("/recommend", (req, res) => {
  const restaurant = req.body; //요청
  const filePath = path.join(__dirname, "data", "restaurants.json"); // 파일 저장된 위치

  const fileData = fs.readFileSync(filePath); // 파일 읽기
  const storeRestaurants = JSON.parse(fileData); // JSON으로 전환
  storeRestaurants.push(restaurant); // 파일 푸시

  fs.writeFileSync(filePath, JSON.stringify(storeRestaurants)); // 파일 쓰기
  console.log(restaurant);
  res.redirect("/confirm");
});

app.get("/confirm", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  // res.sendFile(htmlFilePath);
  res.render("confirm");
});

app.get("/about", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "about.html");
  // res.sendFile(htmlFilePath);
  res.render("about");
});

app.listen(3000);
