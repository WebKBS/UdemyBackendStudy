const db = require("../data/database");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

class Post {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;

    if (id) {
      this.id = new ObjectId(id);
    }
  }

  // static은 인스턴스화 되지 않고, 자체 메서드 호출이 가능하다. * 정적 메서드 정의
  static async fetchAll() {
    const posts = await db.getDb().collection("posts").find().toArray();
    return posts;
  }

  async fetch() {
    if (!this.id) {
      return;
    }

    const postDocument = await db
      .getDb()
      .collection("posts")
      .findOne({ _id: this.id });

    this.title = postDocument.title;
    this.content = postDocument.content;
  }

  async save() {
    let result;
    // 만약 id가 있다면?
    if (this.id) {
      result = await db
        .getDb()
        .collection("posts")
        .updateOne(
          { _id: this.id },
          { $set: { title: this.title, content: this.content } }
        );
    } else {
      result = await db.getDb().collection("posts").insertOne({
        title: this.title,
        content: this.content,
      });
    }

    return result;
  }

  async delete() {
    // id가 없다면
    if (!this.id) {
      return;
    }
    const result = await db
      .getDb()
      .collection("posts")
      .deleteOne({ _id: this.id });

    return result;
  }
}

module.exports = Post;
