import React, { useEffect, useState } from "react";
// import styles from "../components/RecipeDisplay.module.css";
import { useNavigate } from "react-router-dom";

const Ingredients = (props) => {
  const navigate = useNavigate(); //useNavigate hook to handle navigation programmatically.
  // const [recipes, setRecipes] = useState([]);
  const [ingredientsQuery, setIngredientsQuery] = useState(
    props.ingredientsString
  );

  useEffect(() => {
    //Documentation: https://spoonacular.com/food-api/docs#Search-Recipes-by-Ingredients
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
          // let ingredientsRes = [];
          // data.map((id) => ingredientsRes.push(id.title));
          // console.log(ingredientsRes);
          // setRecipes(ingredientsRes);
          // setRecipes(data);
          navigate("/RecipesByIngredients", { state: { recipes: data } });
        } else {
          console.log("Failed to load recipes");
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
