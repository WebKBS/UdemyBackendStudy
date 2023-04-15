const fs = require("fs");

// try catch는 에러를 발생하더라도 다음 코드를 실행시킬 수 있다.
const readFile = () => {
  try {
    const fileData = fs.readFileSync("data.json");
  } catch (error) {
    //console.log(error);
    console.log("파일 Error 발생!!");
  }
  console.log("Hi there!");
  //const a = JSON.parse(fileData);
};

readFile();
