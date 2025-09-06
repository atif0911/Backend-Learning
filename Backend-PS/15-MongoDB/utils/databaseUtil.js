const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

require("dotenv").config(); // load .env
const MONGO_URL = process.env.MONGO_URL;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      callback();
      _db = client.db("airbnb");
    })
    .catch((err) => {
      console.log("Error while Connecting to Mongo: ", err);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("MOngo not exported");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
