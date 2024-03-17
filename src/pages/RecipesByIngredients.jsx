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

  const handleSelectIngredient = (selectedOption) => {
    const selectedIngredient = selectedOption.value;
    //push selected ingredient to the ingredients array
    setIngredients([...ingredients, selectedIngredient]);

    console.log("Array of Ingredients", ingredients);
    // setSearchValue("");
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("FIND MY RECIPES CLICKED");
    //prepare for search query: join all ingredients from the ingridients array into a string of items separated by comma ","
    const prepIngredientsString = ingredients.join(",");
    setIngredientsString(prepIngredientsString);
  };

  return (
    <>
      <Upload></Upload>

      <div className="card" style={{ backgroundColor: "#ffe3cd" }}>
        <IngredientsAutocomplete
          handleSelectIngredient={handleSelectIngredient}
          handleSubmit={handleSubmit}
        ></IngredientsAutocomplete>

        <br />

        {/* Display list of Detected and Selected Ingredients */}
        {console.log("Ingredients array have: ", ingredients)}
        <div className={styles.container}>
          <h5 style={{ margin: "15px" }}>Your List: </h5>

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
        {ingredientsString && (
          <div>
            <Ingredients ingredientsString={ingredientsString}></Ingredients>
          </div>
        )}
      </div>

      {recipes && (
        <div>
          {/************ DISPLAY RECIPE LIST ************/}
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
                    unusedIngredients={recipe.unusedIngredients}
                    usedIngredientCount={recipe.usedIngredientCount}
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
