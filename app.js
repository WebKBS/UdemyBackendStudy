const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false })); //use를 사용하지 않으면 form post전송시 데이터가 전송되지 않는다.

app.get("/currenttime", (req, res) => {
  res.send("<h1>" + new Date().toLocaleDateString() + "</h1>");
});

app.get("/", (req, res) => {
  res.send(
    "<form action='/store-user' method='POST'><label>Your Name</label><input type='text' name='username'><button>Submit</button></form>"
  );
});

// input에는 반드시 name을 입력해야 하며 req.body를 통해서 name속성을 가져올 수 있다.
app.post("/store-user", (req, res) => {
  const userName = req.body.username;
  console.log(userName);
  res.send("<h1>UserName Success!</h1>");
});

app.listen(3000);

//const http = require("http");

// function handleRequest(request, response) {
//   if (request.url === "/currenttime") {
//     response.statusCode = 200;
//     response.end("<h1>" + new Date().toLocaleDateString() + "</h1>");
//   } else if (request.url === "/") {
//     response.statusCode = 200;
//     response.end("<h1>Hi</h1>");
//   }
// }

// const server = http.createServer(handleRequest);

//server.listen(3000);
