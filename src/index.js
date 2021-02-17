const { ping, revision } = require("./utils");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

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

server.use((err, req, res, next) => {
  var statusCode = err.status || 500;
  res.end(res.writeHead(statusCode, err.message));
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);

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
});