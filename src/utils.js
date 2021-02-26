const fs = require("fs");
const monk = require("monk");
const { cookbook, food, ingredient, pantry, recipe, user } = require("./test_data/data")
require("dotenv").config();

const populate_collection = async (db, name, data) => {
  let collection = db.get(name);
  await collection.drop();
  await collection.insert(data);
}

const reloadData = async () => {
  const db = monk(process.env.MONGODB_URI, function(error) {
    if (error) {
       console.error("Db is not connected", error.message);
    }
  });
  try {
    await populate_collection(db, "Cookbook", cookbook);
    await populate_collection(db, "Food", food);
    await populate_collection(db, "Ingredient", ingredient);
    await populate_collection(db, "Pantry", pantry);
    await populate_collection(db, "Recipe", recipe);
    await populate_collection(db, "User", user);
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
