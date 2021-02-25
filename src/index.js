const { ping, revision } = require("./utils");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

const server = express();
const BUILDPATH = "../frontend/build";
const PORT = process.env.PORT || 3030;

var mongoClient = require('mongodb').MongoClient;

server.use(cors());
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, BUILDPATH)));

// Simple endpoint to test if server is running
server.get("/ping", (req, res) => {
  res.send(ping());
});

// Shows the npm version and git hash
server.get("/api/revision", (req, res) => {
  res.send(revision());
});

server.post('/enterFood', (req, res) => {
  body = req.body;
  foodName = body.Name;
  userId = body.UserId;
  generatedId = uuidv4();
  mongoClient.connect("mongodb://localhost:27017/", function(err, db) {
    if(err) {
      console.log(err);
      res.end(JSON.stringify({"error": "Couldn't enter food."}), 404);
    }
    else{
      var dbo = db.db("RecipEZ_DB");
      var newFood = {"Food_Name": foodName, "Food_UUID": generatedId};
      dbo.collection('Pantry').updateOne({"User_UUID": userId}, {$push: {"Pantry_Foods": generatedId}});
      dbo.collection('Food').insertOne(newFood, function(err, res){
        if (err){
          console.log(err);
          res.end(JSON.stringify({"error": "Couldn't enter food."}), 404);
        }
      });
      db.close();
      res.end(JSON.stringify({"success": "Food entered."}), 200);
    }
  });
});

server.delete('/deleteFood', (req, res) => {
  body = req.body;
  foodId = body.Uuid;
  userId = body.UserId;
  mongoClient.connect("mongodb://localhost:27017/", function(err, db) {
    if(err) {
      console.log(err);
      res.end(JSON.stringify({"error": "Couldn't delete food."}), 404);
    }
    else{
      var dbo = db.db("RecipEZ_DB");
      dbo.collection('Pantry').updateOne({"User_UUID": userId}, {$pull: {"Pantry_Foods": foodId}});
      db.close();
    }
  });
  res.end(JSON.stringify({"success": "Food deleted."}), 200);
});

server.get('/getPantry', (req, res) => {
  body = req.body;
  userId = body.UserId;
  mongoClient.connect("mongodb://localhost:27017/", function(err, db) {
    if(err) {
      console.log(err);
      res.end(JSON.stringify({"error": "Couldn't get pantry."}), 404);
    }
    else{
      var dbo = db.db("RecipEZ_DB");
      dbo.collection('Pantry').findOne({"User_UUID": userId}, function(err, document) {
        res.end(JSON.stringify(document), 200);
      });
      db.close();
    }
  });
});

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

  const readline = require("readline");
  readline.emitKeypressEvents(process.stdin);
  if(process.stdin.isTTY){
    process.stdin.setRawMode(true);
  }
  process.stdin.on("keypress", (str, key) => {
    if (key.name === "q") {
      console.log("Goodbye!");
      process.exit();
    }
  });
  console.log("Press 'q' to quit");
});
