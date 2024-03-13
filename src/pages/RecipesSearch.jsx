import React from "react";
import { useLocation } from "react-router-dom";
import RecipeDisplay from "../components/RecipeDisplay";

const RecipesSearch = () => {
  const location = useLocation();
  const recipes = location.state?.recipes ?? null;
  console.log("Recipes Search Page Count:", recipes.count);
  console.log("Recipes Search Page Hits:", recipes.hits);

  return (
    <>
      <article>
        <label>Found {recipes.count} Recipes</label>
        <div className="center inset">
          <div className="scroll-x recipe-list">
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
        </div>
      </article>
    </>
  );
};

export default RecipesSearch;
