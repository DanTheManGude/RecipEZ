"use es6";

import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import API from "../utils/API";

const Search = (props) => {
  const { query, onChange, search } = props;

  return (
    <div>
      <input type="text" value={query} onChange={onChange} />
      <button onClick={search}>Search Recipes</button>
    </div>
  )
}

const Recipe = ({props}) => {
  const { cookbook_uuid, recipe_name, recipe_ingredients, instructions } = props;
  return (
    <div>
      <h3>{recipe_name} found in {cookbook_uuid}</h3>
      <h4>Ingredients</h4>
      <ul>
        {recipe_ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>)}
      </ul>
      <h4>Instructions</h4>
      <ol>
        {instructions.map((instruction, i) => <li key={i}>{instruction}</li>)}
      </ol>
    </div>
  )
}

const Results = ({results}) => {
  return results.map((result, i) => <Recipe key={i} props={result} />)
}

function SignIn(props) {
  // const { userId } = props;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasResult, setHasResult] = useState(true);
  const [error, setError] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(query);
    console.log('test');
    try {
      const response = await API.get("searchRecipes", {
        params: {
          keyword: query
        }
      });
      if (response.status == 200) {
        setError(false);
        if (response.data.recipes) {
          setHasResult(true);
          setResults(response.data.recipes);
        } else {
          setHasResult(false);
        }
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError('Encountered unknown server error.');
    }
  }

  return (
    <div id="search-recipe">
      <h1>Recipe Search</h1>
      <Search value={query} onChange={handleQuery} search={handleSubmit} />
      { hasResult ? <Results results={results} /> : <>No recipes found.</> }
      { error && <>{error}</> }
    </div>
  );
}

export default SignIn;
