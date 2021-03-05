"use es6";

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import IngredientInput from "./IngredientInput";
import API from "../utils/API";

const emptyIngredient = { amount: "", food: "" };

function NewRecipe() {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState([""]);
  const [ingredients, setIngredients] = useState([emptyIngredient]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
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

  const getRemoveInstruction = (index) => () => {
    setInstructions((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);

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

  const getHandleIngredients = (index) => (newValue) => {
    setIngredients((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1, newValue);
      return newState;
    });
  };

  const appendIngeredient = () => {
    setIngredients((prevState) => {
      const newState = [...prevState];
      newState.push(emptyIngredient);

      return newState;
    });
  };

  const getRemoveIngredient = (index) => () => {
    setIngredients((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);

      return newState;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      API.post("newRecipe", {
        name,
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
        <h3 style={{ display: "inline" }}>Name: </h3>
        <input type="text" value={name} onChange={handleName} />
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
                <button type="button" onClick={getRemoveInstruction(index)}>
                  Remove Instruction
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
                <IngredientInput
                  value={ingredient}
                  updateValue={getHandleIngredients(index)}
                  removeIngredient={getRemoveIngredient(index)}
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
