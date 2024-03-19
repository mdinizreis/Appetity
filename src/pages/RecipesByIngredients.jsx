import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../components/IngredientsDisplay.module.css";
import Upload from "../components/Upload";
import IngredientsAutocomplete from "../components/IngredientsAutocomplete";
import Ingredients from "../components/Ingredients";
import IngredientsDisplay from "../components/IngredientsDisplay";

const RecipesByIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsString, setIngredientsString] = useState();
  const location = useLocation();
  const recipes = location.state?.recipes ?? null;

  /*====================
   Check if location state is truthy (meaning user landed on this page from the Main page) and if it is update haveIngredients
  otherwise set haveIngredients to null
  ====================*/

  const haveIngredients = location.state?.haveIngredients ?? null;

  /*====================
  Adds roboflow detected ingredients to the ingredients array 
  ====================*/
  useEffect(() => {
    if (haveIngredients) {
      setIngredients([...ingredients, ...haveIngredients]);
      console.log("RecipesByIngredients haveIngredients", haveIngredients);
      console.log("RecipesByIngredients ingredients", ingredients);
    }
  }, [haveIngredients]);

  /*====================
  push selected ingredient to the ingredients array
  ====================*/
  const handleSelectIngredient = (selectedOption) => {
    const selectedIngredient = selectedOption.value;
    setIngredients([...ingredients, selectedIngredient]);
  };

  /*====================
  remove ingredient from the ingredients array
  ====================*/
  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  /*====================
  PREPARE INGREDIENTS LIST FOR SEARCH QUERY
  join all ingredients from the ingridients array into a string of items separated by comma ","
  ====================*/
  const handleSubmit = (event) => {
    event.preventDefault();
    const prepIngredientsString = ingredients.join(",");
    setIngredientsString(prepIngredientsString);
  };

  return (
    <>
      {/* LOADS THE UPLOAD COMPONENT */}
      <Upload></Upload>

      {/* LOADS THE INGREDIENTS SEARCH/DROPDOWN */}
      <div className="card" style={{ backgroundColor: "#ffe3cd" }}>
        <IngredientsAutocomplete
          handleSelectIngredient={handleSelectIngredient}
          handleSubmit={handleSubmit}
        ></IngredientsAutocomplete>

        <br />

        {/* DISPLAY LIST OF DETECTED AND SELECTED (DROPDOWN) INGREDIENTS */}
        <div className={styles.container}>
          <h5 style={{ margin: "15px" }}>Your Pantry List: </h5>

          {ingredients.map((ingredient, index) => (
            <ul
              className="list-group list-group-flush border border-dark rounded"
              key={index}
            >
              <li className="list-group-item">
                <button
                  className={styles.button}
                  type="button"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Delete"
                  onClick={() => handleRemoveIngredient(index)}
                ></button>{" "}
                {ingredient}
              </li>
            </ul>
          ))}
        </div>

        {/* INGREDIENTS LIST SEARCH QUERY IS PASSED TO INGREDIENTS COMPONENT FOR API CALL*/}
        {/* UPDATES RECIPE VARIABLE WITH RETIREVED DATA*/}
        {ingredientsString && (
          <div>
            <Ingredients ingredientsString={ingredientsString}></Ingredients>
          </div>
        )}
      </div>

      {recipes && (
        <div>
          {/************ DISPLAY RETURNED RECIPE LIST ************/}
          <div className={styles.recipelistContainer}>
            <div className={styles.recipelist}>
              {recipes.map((recipe, idx) => {
                return (
                  <IngredientsDisplay
                    recipeID={recipe.id}
                    image={recipe.image}
                    missedIngredientCount={recipe.missedIngredientCount}
                    missedIngredients={recipe.missedIngredients}
                    title={recipe.title}
                    usedIngredientCount={recipe.usedIngredientCount}
                    usedIngredients={recipe.usedIngredients}
                    key={idx}
                    id={idx}
                  ></IngredientsDisplay>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipesByIngredients;
