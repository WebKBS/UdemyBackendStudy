const fs = require("fs");

const path = require("path");
const express = require("express");

const app = express();
const uuid = require("uuid");

const resData = require("./util/restaurant-file");

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

  const storeRestaurants = resData.getStoredRestaurant();

  res.render("restaurants", {
    numberOfRestaurants: storeRestaurants.length,
    restaurants: storeRestaurants,
  });
});

app.get("/restaurants/:id", (req, res) => {
  // 아이디 설정한 페이지
  const restaurantId = req.params.id; // .id는 :id와 이름이 같아야한다.
  const storeRestaurants = resData.getStoredRestaurant();

  for (const restaurant of storeRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurants-detail", { restaurant: restaurant });
    }
  }

  // else 문에서 사용하는건 좋지않다.
  // 원하는 :id 페이지를 찾지 못하면 404페이지로 이동한다.
  return res.status(404).render("404");
});

app.get("/recommend", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  // res.sendFile(htmlFilePath);
  res.render("recommend");
});

app.post("/recommend", (req, res) => {
  const restaurant = req.body; //요청
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestaurant();

  restaurants.push(restaurant); // 파일 푸시

  resData.storeRestaurants(restaurants);

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

// 한번에 Error페이지를 만드는 방법
app.use((req, res) => {
  //res.status("404").render("404"); // 404 상태일 때,
  res.status(404).render("404"); // 한번에 전체
});

app.use((error, req, res, next) => {
  res.status(500).render("500"); // 500은 서버측 오류 코드
});

app.listen(3000);
