const { 
  connect,
  reloadData,
  ping,
  revision,
  findUser,
  createUser,
  getFood,
  getCookbook
} = require("./utils");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const server = express();
const BUILDPATH = "../frontend/build";
const PORT = process.env.PORT || 3030;

const dbName = process.env.MONGODB_NAME;
const dbUrl = process.env.MONGODB_URI;
console.log(dbName)
console.log(dbUrl)

var mongoClient = require('mongodb').MongoClient;

server.use(cors());
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, BUILDPATH)));

// Simple endpoint to test if server is running
server.get("/ping", (req, res) => {
  res.send(ping());
});

// Reload mock data
server.post("/reload", async (req, res) => {
  try {
    response = await reloadData();
    if (response) {
      res.send({"message": "Database loaded."});
    } else {
      res.status(400).send({"error": "Error writing to database."});
    }
  } catch (error) {
    next(error);
  }
});

// Shows the npm version and git hash
server.get("/api/revision", (req, res) => {
  res.send(revision());
});

// Sign in user
server.post("/api/signinUser", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).send({"error": "Username and password required."});
  }
  try {
    // validate username and password exist
    const db = await connect();
    const user = await findUser(db, username);
    if (user.password === password) {
      return res.send({"id": user._id});
    }
    res.status(401).send({"error": "Invalid username or password."});
  } catch (error) {
    next(error);
  }
});

// Create user
server.post("/api/createUser", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({"error": "Username and password required."});
  }
  try {
    // validate username and password exist
    const db = await connect();
    const user = await findUser(db, username);
    if (user !== null) {
      return res.status(400).send({"error": "Username already taken."});
    }
    user_uuid = uuidv4();
    const new_user = {
      "username": username,
      "password": password,
      "user_uuid": user_uuid
    };
    const created = createUser(db, new_user);
    if (created) {
      return res.send({"id": user_uuid});
    } else {
      return res.status(404).send({"error": "Could not create user."});
    }
  } catch (error) {
    next(error);
  }
});

server.post('/api/enterFood', (req, res) => {
  body = req.body;
  foodName = body.name;
  userId = body.userId;
  generatedId = uuidv4();
  mongoClient.connect(dbUrl, function(err, db) {
    if(err) {
      console.log(err);
      res.status(500).send({"error": "Couldn't enter food."});
    }
    else{
      var dbo = db.db(dbName);
      var newFood = {"food_name": foodName, "food_uuid": generatedId};
      dbo.collection('pantry').updateOne({"user_uuid": userId}, {$push: {"pantry_foods": generatedId}});
      dbo.collection('food').insertOne(newFood, function(err, res){
        if (err){
          console.log(err);
          res.status(500).send({"error": "Couldn't enter food."});
        }
      });
      db.close();
      res.status(200).send({"success": "Food entered."});
    }
  });
});

server.delete('/api/deleteFood', (req, res) => {
  body = req.body;
  foodId = body.uuid;
  userId = body.userId;
  mongoClient.connect(dbUrl, function(err, db) {
    if(err) {
      console.log(err);
      res.status(500).send({"error": "Couldn't delete food."});
    }
    else{
      var dbo = db.db(dbName);
      dbo.collection('pantry').updateOne({"user_uuid": userId}, {$pull: {"pantry_foods": foodId}});
      db.close();
    }
  });
  res.status(200).send({"success": "Food deleted."});
});

server.get('/api/getPantry', async (req, res) => {
  body = req.body;
  userId = body.userId;
  mongoClient.connect(dbUrl, function(err, db) {
    if(err) {
      console.log(err);
      res.status(500).send({"error": "Couldn't get pantry."});
    }
    else{
      var dbo = db.db(dbName);
      dbo.collection('pantry').findOne({"user_uuid": userId}, async function(err, document) {
        var idToName = [];
        for(var i = 0; i < document.pantry_foods.length; i++){
          var id = document.pantry_foods[i];
          const foodName = await getFood(id);
          var obj = {};
          obj[id] = foodName;
          idToName.push(obj);
        }
        document.pantry_foods = idToName;
        res.status(200).send(document);
      });
      db.close();
    }
  });
});

server.post('/api/createRecipe', async (req, res) => {
  var body = req.body;
  const name = body.name;
  const userId = body.userId;
  const ingredients = body.ingredients;
  const generatedId = uuidv4();
  mongoClient.connect(dbUrl, async function(err, db) {
    if(err){
      console.log(err);
      res.status(500).send({"error": "Couldn't create recipe."});
    }
    else{
      var dbo = db.db(dbName);
      const cookbookId = await getCookbook(userId);
      const newRecipe = {"cookbook_uuid": cookbookId, "recipe_uuid": generatedId, "recipe_ingredients": ingredients, "recipe_name": name};
      dbo.collection('recipe').insertOne(newRecipe, function(err, document) {
        if (err){
          console.log(err);
          res.status(500).send({"error": "Couldn't enter recipe."});
        }else{
          res.status(200).send({"success": "Recipe entered."});
        }
      });
      db.close();
    }
  })
});

server.get('/api/searchRecipes', (req, res) => {
  var body = req.body;
  const keyword = body.keyword;
  mongoClient.connect(dbUrl, function(err, db) {
    if(err){
      console.log(err);
      res.status(500).send({"error": "Couldn't search recipes."});
    } else {
      var dbo = db.db(dbName);
      dbo.collection('recipe').find({"recipe_Name":{$regex: keyword}}).toArray(function(err, document) {
        if (err){
          console.log(err);
          res.status(500).send({"error": "Couldn't search recipes."});
        }else{
          res.status(200).send({"recipes": document});
        }
      });
    }
    db.close();
  })
})

// Serves the frontend app
server.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, BUILDPATH, "index.html"));
});

server.use((err, req, res, next) => {
  var statusCode = err.status || 500;
  res.end(res.writeHead(statusCode, err.message));
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);

  if (process.stdin.isTTY) {
    const readline = require("readline");
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on("keypress", (str, key) => {
      if (key.name === "q") {
        console.log("Goodbye!");
        process.exit();
      }
    });
    console.log("Press 'q' to quit");
  }
});
