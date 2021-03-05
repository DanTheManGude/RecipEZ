"use es6";

import React from "react";

function IngredientInput(props) {
  const {
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
        Amount: <input type="text" value={amount} onChange={handleAmount} />
        Food: <input type="text" value={food} onChange={handleFood} />
        <button type="button" onClick={removeIngredient}>
          Remove Ingredient
        </button>
      </span>
    </div>
  );
}

export default IngredientInput;
