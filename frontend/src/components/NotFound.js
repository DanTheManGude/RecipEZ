"use es6";

import React, { Component } from "react";

function NotFound() {
  return (
    <div id="NotFound">
      <h1>Ruh roh</h1>
      <p>
        Oh no, it seems that page can not be found. There is no need to cry over
        spilled milk.
      </p>
      <img src="/media/spilledMilk.jpg" width={"80%"}></img>
    </div>
  );
}

export default NotFound;
