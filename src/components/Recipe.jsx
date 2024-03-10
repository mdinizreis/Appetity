import React, { useState } from "react";

const Recipe = () => {
  const [recipes, setRecipes] = useState();
  const [recipeQuery, setRecipeQuery] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = new URL(import.meta.env.VITE_EDAMAM);
      //   const url = new URL("https://api.edamam.com/api/recipes/v2");
      url.searchParams.append("type", "public");
      url.searchParams.append("app_key", "d594173ed0535126fa9ce347fc8c9e98"); //can this go to the .env file?
      url.searchParams.append("app_id", "e1eb38f1");
      url.searchParams.append("q", recipeQuery);
      console.log(url);

      const recipeQueryRes = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (recipeQueryRes.ok) {
        const data = await recipeQueryRes.json();
        setRecipes(data);
      } else {
        console.log("Failed to load recipes");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card">
      <div className="card-header">SEARCH RECIPES BASED ON SEARCH TEARM</div>
      <div className="card-body">
        <h5 className="card-title">Edamam API</h5>
        <p className="card-text">
          Using EDAMAM Recipe Search API to get recipes based on search terms,
          dietary restrictions, nutrional requirements, etc.{" "}
          <a href="https://developer.edamam.com/edamam-docs-recipe-api">
            Documentation
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={recipeQuery}
            onChange={(event) => {
              setRecipeQuery(event.target.value);
            }}
            placeholder="Enter Search"
          />
          <button type="submit" className="btn btn-primary mb-2">
            Search Recipes
          </button>
        </form>
      </div>
      <h3>Response:</h3>
      <p>{JSON.stringify(recipes)}</p>
    </div>
  );
};

export default Recipe;
