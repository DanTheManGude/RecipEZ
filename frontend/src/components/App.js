"use es6";

import React from "react";
import Routes from "./Routes.js";
import { Link } from "react-router-dom";

function App() {
  return (
    <div id="app">
      <ul>
        <Link to="/signup">
          <li>Sign Up</li>
        </Link>
        <Link to="/signin">
          <li>Sign In</li>
        </Link>
        <Link to="/searchRecipe">
          <li>Recipe Search</li>
        </Link>
        <Link to="/newRecipe">
          <li>NewRecipe</li>
        </Link>
        <Link to="/home">
          <li>Home</li>
        </Link>
        <Routes />
      </ul>
    </div>
  );
}

export default App;
