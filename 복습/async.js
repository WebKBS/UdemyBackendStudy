const fs = require("fs/promises");
const { addSyntheticLeadingComment } = require("typescript");

const readFile = () => {
  // fs.readFile("data.txt", (error, fileData) => {
  //if(error){
  //
  //} // 에러개 발생했을때
  //   console.log("hi");
  //   console.log(fileData.toString()); // 읽은 파일을 문자열로 바꿔준다.
  // });

  fs.readFile("data.txt")
    .then((fileData) => {
      console.log(fileData.toString());
    })
    .catch((error) => {
      console.log(error);
      console.log("파일 누락");
    });

  console.log("Hi there!");
};

readFile();
