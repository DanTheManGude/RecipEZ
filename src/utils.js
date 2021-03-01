const fs = require("fs");
const monk = require("monk");
const { cookbook, food, ingredient, pantry, recipe, user } = require("./test_data/data")
require("dotenv").config();

const dropDatabase = () => {
  let db = monk(process.env.MONGODB_URI, function(error) {
    if (error) {
       console.error("Db is not connected", error.message);
    }
  }).then((db) => {
    db._db.dropDatabase();
  });
}

const populateCollection = async (db, name, data) => {
  try {
    let collection = db.get(name);
    await collection.insert(data);
  } catch (error) {
    throw(error);
  }
}

const reloadData = async () => {
  try {
    dropDatabase();
    const db = monk(process.env.MONGODB_URI, function(error) {
      if (error) {
         console.error("Db is not connected", error.message);
      }
    });
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

const ping = () => {
  return "pong";
};

const revision = () => {
  const version =
    process.env.npm_package_version || "No package version available";

  return { version };
};

const findUser = async (db, username) => {
  const users = db.get("user");
  return await users.findOne({
    "username": username
  });
}

const createUser = async (db, new_user) => {
  const users = db.get("user");
  return await users.insert(new_user);
}

module.exports = { 
  reloadData,
  ping,
  revision,
  findUser,
  createUser
};
