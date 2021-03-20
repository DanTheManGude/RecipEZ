"use es6";

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import FormButton from "./FormButton";
import IngredientInput from "./IngredientInput";
import API from "../utils/API";

const emptyIngredient = { amount: "", food: "" };

function NewRecipe(props) {
  const { userId } = props;

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

  const appendIngredient = () => {
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
      API.post("createRecipe", {
        name,
        instructions,
        ingredients,
        userId,
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

  if (!userId) {
    return <Typography variant="h5">You must login to make new Recipes</Typography>;
  }

  return (
    <div className="page" id="new-recipe">
      <Typography variant="h4">Create a new Recipe</Typography>
      <div>
        <TextField type="text" value={name} label="Recipe Name" onChange={handleName} />
        <Typography variant="h6">Instructions:</Typography>
        <ol>
          {instructions.map((instruction, index) => {
            return (
              <li key={index}>
                <TextField type="text" value={instruction} label="Instruction" onChange={getHandleInstruction(index)} />
                <IconButton onClick={getNewInstruction(index)}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={getRemoveInstruction(index)}>
                  <DeleteIcon />
                </IconButton>
              </li>
            );
          })}
        </ol>
        <FormButton type="button" onClick={appendInstruction}
          text="Add New Instruction"
        />
      </div>
      <div>
        <Typography variant="h6">Ingredients:</Typography>
        <ol>
          {ingredients.map((ingredient, index) => {
            return (
              <li key={index}>
                <IngredientInput
                  userId={userId}
                  value={ingredient}
                  updateValue={getHandleIngredients(index)}
                  removeIngredient={getRemoveIngredient(index)}
                />
              </li>
            );
          })}
        </ol>
        <FormButton type="button" onClick={appendIngredient}
          text="Add new Ingredient"
        />
      </div>
      <div>
        <FormButton type="button" onClick={handleSubmit}
          text="Submit new Recipe"
        />
      </div>
      {error && <span>Ruh roh, something went wrong</span>}
      {success && <Redirect to="/home" />}
    </div>
  );
}

export default NewRecipe;
