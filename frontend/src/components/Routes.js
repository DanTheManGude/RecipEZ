"use es6";

import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import Admin from "./Admin";
import Home from "./Home";

import NotFound from "./NotFound";

function Routes() {
  return (
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />

      <Route exact path="/admin" component={Admin} />

      <Route exact path="/home" render={() => <Home />} />
      <Redirect exact from="/" to="/home" />

      <Route exact path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  );
}

export default Routes;
