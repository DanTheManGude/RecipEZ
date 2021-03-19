"use es6";

import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Recipe from "./Recipe";

function ViewRecipe(props) {
  const {
    match: {
      params: { name },
    },
  } = props;

  const [recipeValues, setRecipeValues] = useState(null);
  const [hasDeleted, setHasDeleted] = useState(false);

  useEffect(() => {
    try {
      API.get("searchRecipes", {
        params: {
          keyword: name,
        },
      }).then((response) => {
        if (response.status == 200) {
          const {
            data: { recipes },
          } = response;

          if (recipes && recipes[0]) {
            setRecipeValues(recipes[0]);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [name]);

  const handleDelete = () => {
    try {
      API.delete("deleteRecipe", {
        params: {
          recipeId: recipeValues.recipeId,
        },
      }).then((response) => {
        if (response.status == 200) {
          setHasDeleted(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (hasDeleted) {
    return <Redirect to="/home" />;
  }

  if (recipeValues) {
    return (
      <div>
        <Recipe props={recipeValues} />
        <button type="button" onClick={handleDelete}>
          Delete Recipe
        </button>
      </div>
    );
  }

  return null;
}

export default ViewRecipe;
