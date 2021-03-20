"use es6";

import React, { useState } from "react";
import API from "../utils/API";

import Recipe from "./Recipe";

const Search = (props) => {
  const { query, onChange, search } = props;

  return (
    <form onSubmit={search}>
      <input type="text" value={query} onChange={onChange} />
      <input type="submit" value="Search Recipes" />
    </form>
  );
};

const Results = ({ results }) => {
  return (
    <>
      Found {results.length} recipes.
      {results.map((result, i) => (
        <Recipe key={result.name} {...result} />
      ))}
    </>
  );
};

const ClearButton = ({ clearResults }) => {
  return (
    <button type="button" onClick={clearResults}>
      Clear Results
    </button>
  );
};

function SignIn(props) {
  // const { userId } = props;
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
    <div id="search-recipe">
      <h1>Recipe Search</h1>
      <Search value={query} onChange={handleQuery} search={handleSubmit} />
      {hasSearched && <ClearButton clearResults={clearResults} />}
      {hasSearched && <Results results={results} setResults={setResults} />}
      {error && <>{error}</>}
    </div>
  );
}

export default SignIn;
