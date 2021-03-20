"use es6";

import React, { useState } from "react";
import Routes from "./Routes.js";
import { Link } from "react-router-dom";
import { styled } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const LinkButton = styled(Button)({
  color: 'white',
});

const NavMenu = styled(AppBar)({
  '& a': {
    textDecoration: 'none'
  }
});

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <div id="app">
      <NavMenu position="static">
        <Toolbar>
          <Link to="/home">
            <LinkButton>
              <Typography variant="h6">RecipeZ</Typography>
            </LinkButton>
          </Link>
          {userId === null ?
            <>
              <Link to="/signup">
                <LinkButton>Sign Up</LinkButton>
              </Link>
              <Link to="/signin">
                <LinkButton>Sign In</LinkButton>
              </Link>
            </>
            :
            <LinkButton onClick={() => setUserId(null)}>Sign Out</LinkButton>
          }
          <Link to="/searchRecipe">
            <LinkButton>Recipe Search</LinkButton>
          </Link>
          <Link to="/newRecipe">
            <LinkButton>New Recipe</LinkButton>
          </Link>
        </Toolbar>
      </NavMenu>
      <ul>
        <Routes userId={userId} setUserId={setUserId} />
      </ul>
    </div>
  );
}

export default App;
