"use es6";

import React from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

function IngredientInput(props) {
  const {
    userId,
    value: { amount, food },
    updateValue,
    removeIngredient,
  } = props;

  const handleAmount = (e) => {
    updateValue({ amount: e.target.value, food });
  };

  const handleFood = (e) => {
    updateValue({ amount, food: e.target.value });
  };

  return (
    <div id="ingredient-value">
      <span>
        <TextField type="text" value={amount} label="Amount" onChange={handleAmount} />
        <TextField type="text" value={food} label="Food" onChange={handleFood} />
        <IconButton onClick={removeIngredient}>
          <DeleteIcon />
        </IconButton>
      </span>
    </div>
  );
}

export default IngredientInput;
