"use es6";

import React, { useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NewRecipe from "./NewRecipe";

import SearchRecipe from "./SearchRecipe.js"

import Admin from "./Admin";
import Home from "./Home";

import NotFound from "./NotFound";

function Routes() {
  const [userId, setUserId] = useState(null);

  return (
    <Switch>
      <Route path="/signin" render={() => <SignIn setUserId={setUserId} />} />
      <Route path="/signup" render={() => <SignUp setUserId={setUserId} />} />

      <Route path="/newRecipe" render={() => <NewRecipe userId={userId} />} />

      <Route path="/searchRecipe" component={SearchRecipe} />

      <Route exact path="/admin" component={Admin} />

      <Route exact path="/home" render={() => <Home />} />
      <Redirect exact from="/" to="/home" />

      <Route exact path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  );
}

export default Routes;
