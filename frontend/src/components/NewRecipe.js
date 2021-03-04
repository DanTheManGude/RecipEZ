"use es6";

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

function NewRecipe() {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const getHandleInstruction = (index) => (e) => {
    setInstructions((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1, e.target.value);
      return newState;
    });
  };

  const getNewInstruction = (index) => () => {
    setInstructions((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 0, "");

      return newState;
    });
  };

  const appendInstruction = () => {
    setInstructions((prevState) => {
      const newState = [...prevState];
      newState.push("");

      return newState;
    });
  };

  const getHandleIngredients = (index) => (e) => {
    setIngredients((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1, e.target.value);
      return newState;
    });
  };

  const appendIngeredient = () => {
    setIngredients((prevState) => {
      const newState = [...prevState];
      newState.push("");

      return newState;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      API.post("newRecipe", {
        title,
        instructions,
        ingredients,
      }).then((response) => {
        if (response.status == 200) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div id="new-recipe">
      <h1>Create a new Recipe</h1>
      <span>
        <h3 style={{ display: "inline" }}>Title: </h3>
        <input type="text" value={title} onChange={handleTitle} />
      </span>
      <div>
        <h3>Instructions:</h3>
        <ol>
          {instructions.map((instruction, index) => {
            return (
              <li key={index}>
                <input
                  type="text"
                  value={instruction}
                  onChange={getHandleInstruction(index)}
                />
                <button type="button" onClick={getNewInstruction(index)}>
                  Add new Instruction before
                </button>
              </li>
            );
          })}
        </ol>
        <button type="button" onClick={appendInstruction}>
          Add new Instruction at the end
        </button>
      </div>
      <div>
        <h3>Ingredients:</h3>
        <ol>
          {ingredients.map((ingredient, index) => {
            return (
              <li key={index}>
                <input
                  type="text"
                  value={ingredient}
                  onChange={getHandleIngredients(index)}
                />
              </li>
            );
          })}
        </ol>
        <button type="button" onClick={appendIngeredient}>
          Add new Ingeredient
        </button>
      </div>
      <button type="button" onClick={handleSubmit}>
        Submit new Recipe
      </button>
      {error && <span>Ruh roh, something went wrong</span>}
      {success && <Redirect to="/home" />}
    </div>
  );
}

export default NewRecipe;
