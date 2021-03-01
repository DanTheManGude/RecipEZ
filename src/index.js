const { 
  reloadData, 
  ping, 
  revision, 
  findUser,
  createUser
} = require("./utils");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const monk = require("monk");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const db = monk(process.env.MONGODB_URI, function(error) {
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

// Sign in user
server.post("/api/signinUser", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // validate username and password exist
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
  try {
    // validate username and password exist
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
