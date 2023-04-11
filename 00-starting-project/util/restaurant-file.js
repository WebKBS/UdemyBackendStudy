const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "..", "data", "restaurants.json"); // 파일 저장된 위치
//두번째 '..'은 상위 폴더로 올라갈수 있다.

const getStoredRestaurant = () => {
  const fileData = fs.readFileSync(filePath); // 파일 읽기
  const storeRestaurants = JSON.parse(fileData); // JSON으로 전환

  return storeRestaurants;
};

const storeRestaurants = (storableRestaurants) => {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants)); // 파일 쓰기
};

module.exports = {
  getStoredRestaurant: getStoredRestaurant,
  storeRestaurants: storeRestaurants,
}; // 내보내기 할때는 () 함수를 호출하지 않는다.
