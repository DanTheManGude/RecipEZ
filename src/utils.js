const { 
  cookbook,
  food,
  ingredient,
  pantry,
  recipe,
  user 
} = require("./test_data/data")
const mongoClient = require('mongodb').MongoClient;
require("dotenv").config();

const dbName = process.env.MONGODB_NAME;
const dbUrl = process.env.MONGODB_URI;

const connect = async () => {
  const client = await mongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_NAME);
  return db;
}

const dropDatabase = async () => {
  const db = await connect();
  db.dropDatabase();
}

const populateCollection = async (db, name, data) => {
  try {
    await db.collection(name).insertMany(data);
  } catch (error) {
    throw(error);
  }
}

const reloadData = async () => {
  try {
    await dropDatabase();
    const db = await connect();
    await populateCollection(db, "cookbook", cookbook);
    await populateCollection(db, "food", food);
    await populateCollection(db, "ingredient", ingredient);
    await populateCollection(db, "pantry", pantry);
    await populateCollection(db, "recipe", recipe);
    await populateCollection(db, "user", user);
    return true;
  } catch (error) {
    return false;
  }
}
require("dotenv").config();

const ping = () => {
  return "pong";
};

const revision = () => {
  const version =
    process.env.npm_package_version || "No package version available";

  return { version };
};

const findUser = async (db, username) => {
  return await db.collection("user").findOne({
    "username": username
  });
}

const createUser = async (db, new_user) => {
  return await db.collection("user").insertOne(new_user);
}

async function getFood(uuid) {
  const db = await connect()
  const food = await db.collection('food').findOne({"food_uuid": uuid});
  return food["food_name"];
};

module.exports = { 
  connect,
  reloadData,
  ping,
  revision,
  findUser,
  createUser,
  getFood
};
