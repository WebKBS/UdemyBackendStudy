const fs = require("fs");

const readFile = () => {
  fs.readFile("data.txt", (error, fileData) => {
    console.log("hi");
    console.log(fileData.toString()); // 읽은 파일을 문자열로 바꿔준다.
  });

  console.log("Hi there!");
};

readFile();
