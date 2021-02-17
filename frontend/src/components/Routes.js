"use es6";

import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Page1 from "./Page1";
import Page2 from "./Page2";

import Admin from "./Admin";
import Home from "./Home";

import NotFound from "./NotFound";

function Routes() {
  return (
    <Switch>
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />

      <Route exact path="/admin" component={Admin} />

      <Route exact path="/home" render={() => <Home />} />
      <Redirect exact from="/" to="/home" />

      <Route exact path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  );
}

export default Routes;
