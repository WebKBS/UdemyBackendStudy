const fs = require("fs/promises");

const readFile = async () => {
  // fs.readFile("data.txt", (error, fileData) => {
  //if(error){
  //
  //} // 에러개 발생했을때
  //   console.log("hi");
  //   console.log(fileData.toString()); // 읽은 파일을 문자열로 바꿔준다.
  // });

  const fileData = await fs.readFile("data.txt");

  console.log(fileData.toString());

  console.log("Hi there!");
};

readFile();
