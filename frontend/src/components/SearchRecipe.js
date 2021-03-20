"use es6";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormButton from "./FormButton";
import API from "../utils/API";

const Search = (props) => {
  const { query, onChange, search, hasSearched, clearResults } = props;

  return (
    <form onSubmit={search}>
      <div className="search-actions">
        <TextField type="text" value={query} label="Query" onChange={onChange} />
        <FormButton type="submit" text="Search Recipes" />
        <FormButton disabled={!hasSearched} type="button" onClick={clearResults} text="Clear Results" />
      </div>
    </form>
  );
};

const Results = ({ results }) => {
  return (
    <>
      <div>Found {results.length} recipes.</div>
      <ol>
        {results.map((result, i) => (
          <li key={result.name} >
            <Link to={`/viewRecipe/${result.name}`}>
              {result.name} found in "{result.cookbook}"
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
};

function SearchRecipe() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const clearResults = () => {
    setResults([]);
    setHasSearched(false);
  };

  const handleQuery = (e) => {
    setQuery(e.target.value);
    if (error !== "") {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    try {
      const response = await API.get("searchRecipes", {
        params: {
          keyword: query,
        },
      });
      if (response.status == 200) {
        setError(false);
        setResults(response.data.recipes);
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError("Encountered unknown server error.");
    }
  };

  return (
    <div className="page" id="search-recipe">
      <Typography variant="h4">Recipe Search</Typography>
      <Search 
        value={query}
        onChange={handleQuery}
        search={handleSubmit}
        hasSearched={hasSearched}
        clearResults={clearResults}
      />
      {hasSearched && <Results results={results} setResults={setResults} />}
      {error && <>{error}</>}
    </div>
  );
}

export default SearchRecipe;
