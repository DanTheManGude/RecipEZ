var mongoClient = require('mongodb').MongoClient;
const dbName = "RecipEZ_DB"
const dbUrl = "mongodb://localhost:27017/"

const ping = () => {
  return "pong";
};

const revision = () => {
  const version =
    process.env.npm_package_version || "No package version available";

  return { version };
};

async function getFood(uuid) {
  const db = await mongoClient.connect(dbUrl);
  var dbo = db.db(dbName);
  const food = await dbo.collection('Food').findOne({"Food_UUID": uuid});
  return food["Food_Name"];
};

module.exports = { ping, revision, getFood };