const {
  connect,
  reloadData,
  ping,
  revision,
  findUser,
  createUser,
  getFood,
  getCookbookIdFromUser,
  getCookbook,
  getIngredient,
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
console.log(dbName);
console.log(dbUrl);

var mongoClient = require("mongodb").MongoClient;

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
      res.send({ message: "Database loaded." });
    } else {
      res.status(400).send({ error: "Error writing to database." });
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
    return res.status(401).send({ error: "Username and password required." });
  }
  try {
    // validate username and password exist
    const db = await connect();
    const user = await findUser(db, username);
    if (user.password === password) {
      return res.send({ id: user.user_uuid });
    }
    res.status(401).send({ error: "Invalid username or password." });
  } catch (error) {
    next(error);
  }
});

// Create user
server.post("/api/createUser", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ error: "Username and password required." });
  }
  try {
    // validate username and password exist
    const db = await connect();
    const user = await findUser(db, username);
    if (user !== null) {
      return res.status(400).send({ error: "Username already taken." });
    }
    user_uuid = uuidv4();
    const new_user = {
      username: username,
      password: password,
      user_uuid: user_uuid,
    };
    const created = createUser(db, new_user);
    if (created) {
      return res.send({ id: user_uuid });
    } else {
      return res.status(404).send({ error: "Could not create user." });
    }
  } catch (error) {
    next(error);
  }
});

server.post("/api/enterFood", (req, res) => {
  body = req.body;
  foodName = body.name;
  userId = body.userId;
  generatedId = uuidv4();
  mongoClient.connect(dbUrl, function (err, db) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Couldn't enter food." });
    } else {
      var dbo = db.db(dbName);
      var newFood = { food_name: foodName, food_uuid: generatedId };
      dbo
        .collection("pantry")
        .updateOne(
          { user_uuid: userId },
          { $push: { pantry_foods: generatedId } }
        );
      dbo.collection("food").insertOne(newFood, function (err, res) {
        if (err) {
          console.log(err);
          res.status(500).send({ error: "Couldn't enter food." });
        }
      });
      db.close();
      res.status(200).send({ success: "Food entered." });
    }
  });
});

server.delete("/api/deleteFood", (req, res) => {
  body = req.body;
  foodId = body.uuid;
  userId = body.userId;
  mongoClient.connect(dbUrl, function (err, db) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Couldn't delete food." });
    } else {
      var dbo = db.db(dbName);
      dbo
        .collection("pantry")
        .updateOne({ user_uuid: userId }, { $pull: { pantry_foods: foodId } });
      db.close();
    }
  });
  res.status(200).send({ success: "Food deleted." });
});

server.get("/api/getPantry", async (req, res) => {
  const userId = req.query.userId;
  mongoClient.connect(dbUrl, function (err, db) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Couldn't get pantry." });
    } else {
      var dbo = db.db(dbName);
      dbo
        .collection("pantry")
        .findOne({ user_uuid: userId }, async function (err, document) {
          var idToName = [];
          for (var i = 0; i < document.pantry_foods.length; i++) {
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

server.post("/api/createIngredient", async (req, res) => {
  body = req.body;
  amount = req.body.ingredient_amount;
  food_uuid = req.body.food_uuid;
  recipe_uuid = req.body.recipe_uuid;
  generatedId = uuidv4();
  mongoClient.connect(dbUrl, function (err, db) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Couldn't enter ingredient." });
    } else {
      var dbo = db.db(dbName);
      var newIngredient = {
        ingredient_amount: amount,
        ingredient_uuid: generatedId,
        food_uuid: food_uuid,
      };
      dbo
        .collection("recipe")
        .updateOne(
          { recipe_uuid: recipe_uuid },
          { $push: { recipe_ingredients: generatedId } }
        );
      dbo
        .collection("ingredient")
        .insertOne(newIngredient, function (err, res) {
          if (err) {
            console.log(err);
            res.status(500).send({ error: "Couldn't enter ingredient." });
          }
        });
      db.close();
      res.status(200).send({ success: "Ingredient entered." });
    }
  });
});

server.get("/api/getFoods", async (req, res) => {
  mongoClient.connect(dbUrl, async function (err, db) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Couldn't get foods." });
    } else {
      var dbo = db.db(dbName);
      var foods = await dbo.collection("food").find({}).toArray();
      db.close();
      res.status(200).send({ success: "Foods returned.", foods: foods });
    }
  });
});

server.post("/api/createRecipe", async (req, res) => {
  var body = req.body;
  console.log(body);
  const name = body.name;
  const userId = body.userId;
  const ingredients = body.ingredients;
  const instructions = body.instructions;
  const generatedId = uuidv4();
  mongoClient.connect(dbUrl, async function (err, db) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Couldn't create recipe." });
    } else {
      var dbo = db.db(dbName);
      const cookbookId = await getCookbookIdFromUser(userId);
      const newRecipe = {
        cookbook_uuid: cookbookId,
        recipe_uuid: generatedId,
        recipe_ingredients: ingredients,
        recipe_name: name,
        instructions: instructions,
      };
      dbo.collection("recipe").insertOne(newRecipe, function (err, document) {
        if (err) {
          console.log(err);
          res.status(500).send({ error: "Couldn't enter recipe." });
        } else {
          res.status(200).send({ success: "Recipe entered." });
        }
      });
      db.close();
    }
  });
});

server.get("/api/searchRecipes", async (req, res) => {
  const keyword = req.query.keyword;
  try {
    const db = await connect();
    const searchResults = await db
      .collection("recipe")
      .find({ recipe_name: { $regex: keyword } })
      .toArray();
    let recipes = await Promise.all(
      searchResults.map(async (data) => {
        const cookbook = await getCookbook(db, data.cookbook_uuid);
        return {
          cookbook: cookbook.cookbook_name,
          name: data.recipe_name,
          ingredients: await Promise.all(
            data.recipe_ingredients.map(async (uuid) => {
              let ingredient = await getIngredient(db, uuid);
              let food = await getFood(ingredient.food_uuid);
              return {
                name: food,
                amount: ingredient.ingredient_amount,
              };
            })
          ),
          instructions: data.instructions,
        };
      })
    );
    res.status(200).send({ recipes: recipes });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Couldn't search recipes." });
  }
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
