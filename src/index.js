const { reloadData, ping, revision } = require("./utils");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const monk = require("monk");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const db = monk(process.env.MONGODB_URI, function(error, db) {
  if (error) {
     console.error("Db is not connected", error.message);
  }
});

const server = express();
const BUILDPATH = "../frontend/build";
const PORT = process.env.PORT || 3030;

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

// Serves the frontend app
server.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, BUILDPATH, "index.html"));
});

// Reload mock data
server.post("/api/reload", (req, res) => {
  reloadData();
  res.send("Database loaded.")
});

// Sign in user
server.post("/api/signinUser", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // validate username and password exist
    const users = db.get("User");
    const check = await users.findOne({
      "User_Name": username,
      "User_Password": password
    });
    if (check)
      return res.send("Sign in successful.");
    res.status(401).send("Invalid username or password.");
  } catch (error) {
    next(error);
  }
});

// Create user
server.post("/api/createUser", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // validate username and password exist
    const users = db.get("User");
    const check = await users.findOne({
      "User_Name": username
    });
    if (check)
      return res.status(400).send("Username already taken.");
    const new_user = {
      "User_Name": username,
      "User_Password": password,
      "User_UUID": uuidv4()
    }
    const created = await users.insert(new_user)
    res.send("User created.");
  } catch (error) {
    next(error);
  }
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
