const fs = require("fs");
const monk = require("monk");
const { cookbook, food, ingredient, pantry, recipe, user } = require("./test_data/data")
require("dotenv").config();

const reloadData = async () => {
  const db = monk(process.env.MONGODB_URI, function(error, db) {
    if (error) {
       console.error("Db is not connected", error.message);
    }
  });
  try {
    let collection = db.get('cookbook');
    await collection.drop();
    await collection.insert(cookbook);
    collection = db.get('food');
    await collection.drop();
    await collection.insert(food);
    collection = db.get('ingredient');
    await collection.drop();
    await collection.insert(ingredient);
    collection = db.get('pantry');
    await collection.drop();
    await collection.insert(pantry);
    collection = db.get('recipe');
    await collection.drop();
    await collection.insert(recipe);
    collection = db.get('user');
    await collection.drop();
    await collection.insert(user);
  } catch (error) {
    console.log(error);
  } finally {
    db.close();
  }
}

const ping = () => {
  return "pong";
};

const revision = () => {
  const version =
    process.env.npm_package_version || "No package version available";

  return { version };
};

module.exports = { reloadData, ping, revision };
