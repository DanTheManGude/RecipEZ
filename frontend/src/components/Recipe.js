"use es6";

import React from "react";
import Typography from "@material-ui/core/Typography";

function Recipe(props) {
  const { cookbook, name, ingredients, instructions } = props;
  return (
    <div>
      <Typography variant="h5">
        {name} from "{cookbook}"
      </Typography>
      <Typography variant="h6">
        Ingredients
      </Typography>
      <ul>
        {ingredients.map((ingredient, i) => (
          <li key={i}>
            {ingredient.amount}: {ingredient.name}
          </li>
        ))}
      </ul>
      <Typography variant="h6">
        Instructions
      </Typography>
      <ol>
        {instructions.map((instruction, i) => (
          <li key={i}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
}

export default Recipe;
