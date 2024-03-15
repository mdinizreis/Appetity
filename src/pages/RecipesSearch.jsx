import React from "react";
import { useLocation } from "react-router-dom";
import RecipeDisplay from "../components/RecipeDisplay";
import styles from "../components/RecipeDisplay.module.css";

const RecipesSearch = () => {
  const location = useLocation();
  const recipes = location.state?.recipes ?? null;
  console.log("Recipes Search Page Count:", recipes.count);
  console.log("Recipes Search Page Hits:", recipes.hits);

  return (
    <>
      {/************ DISPLAY RECIPE LIST ************/}
      <div className={styles.recipelist}>
        <h5>Found {recipes.count} Recipes</h5>
      </div>
      <div className={styles.recipelist}>
        {recipes &&
          recipes.hits.map((hit, idx) => {
            return (
              <RecipeDisplay
                calories={hit.recipe.calories}
                image={hit.recipe.image}
                ingredientLines={hit.recipe.ingredientLines}
                label={hit.recipe.label}
                source={hit.recipe.source}
                totalTime={hit.recipe.totalTime}
                url={hit.recipe.url}
                yield={hit.recipe.yield}
                key={idx}
                id={idx}
              ></RecipeDisplay>
            );
          })}
      </div>
    </>
  );
};

export default RecipesSearch;
