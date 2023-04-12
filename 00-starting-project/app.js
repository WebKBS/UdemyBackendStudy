
const path = require("path");
const express = require("express");

const app = express();


const defaultRoutes = require("./routes/default"); // 라우트
const restaurantsRoutes = require("./routes/restaurants"); // 라우트

app.set("views", path.join(__dirname, "views")); // 사용할 폴더 이름 지정
app.set("view engine", "ejs"); // ejs사용 하겠다는 set 지정

app.use(express.static("public")); // css 및 javascript를 사용하려면 반드시 써줘야한다.
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes);

app.use("/", restaurantsRoutes);

// 한번에 Error페이지를 만드는 방법
app.use((req, res) => {
  //res.status("404").render("404"); // 404 상태일 때,
  res.status(404).render("404"); // 한번에 전체
});

app.use((error, req, res, next) => {
  res.status(500).render("500"); // 500은 서버측 오류 코드
});

app.listen(3000);
