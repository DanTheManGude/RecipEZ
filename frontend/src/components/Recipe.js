"use es6";

import React from "react";
import { Link } from "react-router-dom";

function Recipe({ props }) {
  const { cookbook, name, ingredients, instructions } = props;
  return (
    <div>
      <h3>
        <Link to={`/viewRecipe/${name}`}>
          <li>{name}</li>
        </Link>
        found in "{cookbook}"
      </h3>
      <h4>Ingredients</h4>
      <ul>
        {ingredients.map((ingredient, i) => (
          <li key={i}>
            {ingredient.amount}: {ingredient.name}
          </li>
        ))}
      </ul>
      <h4>Instructions</h4>
      <ol>
        {instructions.map((instruction, i) => (
          <li key={i}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
}

export default Recipe;
