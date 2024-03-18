import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Ingredients = (props) => {
  const navigate = useNavigate(); //useNavigate hook to handle navigation programmatically.
  const [ingredientsQuery, setIngredientsQuery] = useState(
    props.ingredientsString
  );

  /*====================
  SPOONACULAR API GET TO RETRIEVE LIST OF RECIPES BASED ON LIST OF INGREDIENTS
  Documentation: https://spoonacular.com/food-api/docs#Search-Recipes-by-Ingredients
  ====================*/
  useEffect(() => {
    async function fetchData() {
      try {
        const url = new URL(import.meta.env.VITE_SPOONACULAR);
        url.searchParams.append("ingredients", ingredientsQuery);
        url.searchParams.append("number", "20");
        url.searchParams.append("limitLicense", "true");
        url.searchParams.append("ranking", "1");
        url.searchParams.append("ignorePantry", "false");
        console.log(url);

        const ingredientsQueryRes = await fetch(url, {
          method: "GET",
          headers: {
            "x-api-key": import.meta.env.VITE_SPOONACULAR_API_KEY,
            "Content-Type": "application/json",
          },
        });

        if (ingredientsQueryRes.ok) {
          console.log("Succesfully load recipes");
          const data = await ingredientsQueryRes.json();
          navigate("/RecipesByIngredients", { state: { recipes: data } });
        } else {
          console.log("Failed to load recipes");
          alert("Oops...Something went wrong! Failed to load recipes");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [ingredientsQuery]);

  return <></>;
};

export default Ingredients;
