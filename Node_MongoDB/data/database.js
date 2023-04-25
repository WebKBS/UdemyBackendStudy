const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
  // 연결속도가 생길수 있으니 비동기로 만들어준다.
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("blog");
}

function getDb() {
  if (!database) {
    throw { message: "데이터베이스 연결 실패!" };
  }
  return database;
}

module.exports = {
  connectToDatabase: connect,
  getDb: getDb,
};
