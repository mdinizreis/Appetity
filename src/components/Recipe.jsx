import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import styles from "./Recipe.module.css";

const Recipe = () => {
  const navigate = useNavigate(); //useNavigate hook to handle navigation programmatically.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipeQuery, setRecipeQuery] = useState("");

  /*====================
    EDAMAM API GET TO GET RECIPES BASED ON USER SEARCH TERM
    Using EDAMAM Recipe Search API to get recipes based on search terms, dietary restrictions, nutrional requirements, etc.
    Pass the recipes data as a state object to Recipes page (for it to be processed and displayed)
    API Documentation: https://developer.edamam.com/edamam-docs-recipe-api
    ====================*/
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      //Importing URL, API KEY and APP ID from .env file
      const url = new URL(import.meta.env.VITE_EDAMAM);
      url.searchParams.append("type", "public");
      url.searchParams.append("app_key", import.meta.env.VITE_EDAMAM_API_KEY);
      url.searchParams.append("app_id", import.meta.env.VITE_EDAMAM_API_APP_ID);
      url.searchParams.append("q", recipeQuery);

      const recipeQueryRes = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      /*====================
    REDIRECT (NAVIGATE) TO ANOTHER PAGE PASSING RETRIEVED RECIPES DATA
    After successfully fetching the recipes data, redirect (navigate) to the RecipesSearch page and pass the recipes data as a state object
    ====================*/
      if (recipeQueryRes.ok) {
        const data = await recipeQueryRes.json();
        setIsLoading(false);
        navigate("/RecipesSearch", { state: { recipes: data } });
      } else {
        setIsLoading(false);
        console.log("Failed to load recipes");
        alert("Oops...Something went wrong! Failed to load recipes");
      }
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className={styles.card}>
      <div className="card mb-3" style={{ height: "18rem" }}>
        <div className="row g-0">
          <div className="col-md-6 centered">
            <form onSubmit={handleSubmit} className="centered">
              <input
                size="40"
                type="text"
                value={recipeQuery}
                onChange={(event) => {
                  setRecipeQuery(event.target.value);
                }}
                placeholder="What are you craving for?"
              />
              <button type="submit" className="btn btn-primary mb-2">
                Search Recipes
              </button>
            </form>
          </div>
          <div className="col-md-6 centered">
            <div className="card-body">
              <h4 className="card-title text-start">Find Recipes You Love</h4>
              <p className="card-text text-start">
                What do you want to cook today? Whether you're in the mood for a
                comforting bowl of pasta, a sizzling stir-fry, or a decadent
                dessert, our recipe search is here to satisfy your taste buds.
                Whatever it is, we've got you covered
              </p>
              <p className="card-text text-start">
                <small className="text-muted">
                  <strong>Search Ideas:</strong> stir fry, thai with chicken,
                  easy cinnamon rolls, tacos with pork, stir fry with chicken
                </small>
              </p>
            </div>
          </div>

          {/* RENDERS LOADING SPINNER WHEN BUTTON IS CLICKED (THAT SETS ISLOADING TO TRUE) AND API CALL IS BEING EXECUTED*/}
          {isLoading && (
            <div className="centered">
              <LoadingSpinner />
            </div>
          )}

          {/* STOP LOADING SPINNER WHEN API CALL HAS FINISHED (SUCCESSFULLY OR NOT) */}
          {!isLoading && error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
