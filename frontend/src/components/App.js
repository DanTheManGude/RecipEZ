"use es6";

import React from "react";
import Routes from "./Routes.js";
import { Link } from "react-router-dom";

function App() {
  return (
    <div id="app">
      <ul>
        <Link to="/page1">
          <li>Page 1</li>
        </Link>
        <Link to="/page2">
          <li>Page 2</li>
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
