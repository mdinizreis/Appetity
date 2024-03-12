import React, { useState } from "react";

const Ingredients = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredientsQuery, setIngredientsQuery] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = new URL(import.meta.env.VITE_SPOONACULAR);
      url.searchParams.append("ingredients", ingredientsQuery);
      url.searchParams.append("number", "10");
      url.searchParams.append("limitLicense", "true");
      url.searchParams.append("ranking", "1");
      url.searchParams.append("ignorePantry", "false");
      console.log(url);

      const ingredientsQueryRes = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-key": "157945dcb32e40cbae2030c098baeee0", //can this go to the .env file?
          "Content-Type": "application/json",
        },
      });

      if (ingredientsQueryRes.ok) {
        const data = await ingredientsQueryRes.json();
        let ingredients = [];
        data.map((id) => ingredients.push(id.title));
        console.log(ingredients);
        setRecipes(ingredients);
        // setRecipes(data);
      } else {
        console.log("Failed to load recipes");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card">
      <div className="card-header">SEARCH RECIPES BY INGREDIENTS</div>
      <div className="card-body">
        <h5 className="card-title">Spoonacular API</h5>
        <p className="card-text">
          Using Spoonacular AI to.{" "}
          <a href="https://spoonacular.com/food-api/docs#Search-Recipes-by-Ingredients">
            Documentation
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={ingredientsQuery}
            onChange={(event) => {
              setIngredientsQuery(event.target.value);
            }}
            placeholder="Enter Ingredients"
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

export default Ingredients;
