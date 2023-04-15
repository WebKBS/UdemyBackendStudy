const fs = require("fs/promises");
const { addSyntheticLeadingComment } = require("typescript");

const readFile = () => {
  // fs.readFile("data.txt", (error, fileData) => {
  //   console.log("hi");
  //   console.log(fileData.toString()); // 읽은 파일을 문자열로 바꿔준다.
  // });

  fs.readFile("data.txt").then((fileData) => {
    console.log(fileData.toString());
  });

  console.log("Hi there!");
};

readFile();
