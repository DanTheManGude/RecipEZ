"use es6";

import React from "react";
import Routes from "./Routes.js";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
function App() {
  return (
    <div id="app">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">RecipeZ</Typography>
          <Link to="/signup">
            <Button color="">Sign Up</Button>
          </Link>
          <Link to="/signin">
            <Button color="">Sign In</Button>
          </Link>
          <Link to="/searchRecipe">
            <Button color="">Recipe Search</Button>
          </Link>
          <Link to="/newRecipe">
            <Button color="">New Recipe</Button>
          </Link>
          <Link to="/home">
            <Button color="">Home</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <ul>
        <Routes />
      </ul>
    </div>
  );
}

export default App;
