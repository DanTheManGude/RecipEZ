"use es6";

import React from "react";
import Typography from "@material-ui/core/Typography";

function Home() {
  return (
    <div className="page" id="home">
      <Typography variant="h4">Welcome to RecipEZ</Typography>
      <Typography variant="body1">
        An easy way to create and manage recipes.
      </Typography>
    </div>
  );
}

export default Home;
