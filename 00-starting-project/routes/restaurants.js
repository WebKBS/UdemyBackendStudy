//const fs = require("fs");
const express = require("express");
const uuid = require("uuid");

const resData = require("../util/restaurant-file");

const router = express.Router();

router.get("/restaurants", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  // res.sendFile(htmlFilePath);

  const storeRestaurants = resData.getStoredRestaurant();

  res.render("restaurants", {
    numberOfRestaurants: storeRestaurants.length,
    restaurants: storeRestaurants,
  });
});

router.get("/restaurants/:id", (req, res) => {
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

router.get("/recommend", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  // res.sendFile(htmlFilePath);
  res.render("recommend");
});

router.post("/recommend", (req, res) => {
  const restaurant = req.body; //요청
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestaurant();

  restaurants.push(restaurant); // 파일 푸시

  resData.storeRestaurants(restaurants);

  console.log(restaurant);
  res.redirect("/confirm");
});

router.get("/confirm", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  // res.sendFile(htmlFilePath);
  res.render("confirm");
});

module.exports = router;
