import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import RecipeDisplay from "./RecipeDisplay";

const Recipe = () => {
  const navigate = useNavigate(); //useNavigate hook to handle navigation programmatically.
  const [recipes, setRecipes] = useState([]);
  const [recipeQuery, setRecipeQuery] = useState("");

  /*====================
    RECIEVES RECIPE QUERY FROM INPUT,  FETCH EDAMAM API DATA AND PASS AS STATE OBJECT
    Pass the recipes data as a state object to Recipes page (for it to be processed and displayed)
    ====================*/
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //Importing URL, API KEY and APP ID from .env file
      const url = new URL(import.meta.env.VITE_EDAMAM);
      url.searchParams.append("type", "public");
      url.searchParams.append("app_key", import.meta.env.VITE_EDAMAM_API_KEY);
      url.searchParams.append("app_id", import.meta.env.VITE_EDAMAM_API_APP_ID);
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
        console.log(data);
        //after successfully fetching the recipes data redirect (navigate) to the RecipesSearch page and pass the recipes data as a state object
        navigate("/RecipesSearch", { state: { recipes: data } });
        // setRecipes(JSON.stringify(data));
      } else {
        console.log("Failed to load recipes");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card">
      <div className="card-header">SEARCH RECIPES BASED ON SEARCH TERM</div>
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
    </div>
  );
};

export default Recipe;
