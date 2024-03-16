import React from "react";
import { useLocation } from "react-router-dom";
import RecipeDisplay from "../components/RecipeDisplay";
import styles from "../components/RecipeDisplay.module.css";
import Recipe from "../components/Recipe";

const RecipesSearch = () => {
  const location = useLocation();
  const recipes = location.state?.recipes ?? null;
  console.log("Recipes Search Page Count:", recipes?.count);
  console.log("Recipes Search Page Hits:", recipes?.hits);

  return (
    <div>
      {/* Check is recipes is truthy (meaning user is landing on this page from search in the Main) 
      otherwise (user is landing on this page from click on the navbar) display the search card  */}
      {recipes ? (
        <div>
          <Recipe></Recipe>
          {/************ DISPLAY 'RECIPES FOUND' COUNTER ************/}
          <br />
          <div className={styles.recipelist}>
            <h5>Found {recipes?.count ?? 0} Recipes</h5>
          </div>
          {/************ DISPLAY RECIPE LIST ************/}
          <div className={styles.recipelistContainer}>
            <div className={styles.recipelist}>
              {recipes.hits.map((hit, idx) => {
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
          </div>
        </div>
      ) : (
        /*====================
        if user is landing on this page from click on the navbar) display the search card
        ====================*/
        <Recipe></Recipe>
      )}
    </div>
  );
};

export default RecipesSearch;
