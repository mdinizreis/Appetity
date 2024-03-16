import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import Ingredients from "../components/Ingredients";
import styles from "../components/IngredientsDisplay.module.css";
import Upload from "../components/Upload";

const RecipesByIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  // const ingredientRef = useRef([]);
  const [searchValue, setSearchValue] = useState("");
  const [ingredientOptions, setIngredientOptions] = useState([]);

  const location = useLocation();
  /*====================
   Check if location state is truthy (meaning user landed on this page from the Main page) and if it is update haveIngredients
  otherwise set haveIngredients to null
  ====================*/

  const haveIngredients = location.state?.haveIngredients ?? null;

  const handleSelectIngredient = (selectedOption) => {
    const selectedIngredient = selectedOption.value;
    setIngredients([...ingredients, selectedIngredient]);
    console.log("Array of Ingredients", ingredients);
    setSearchValue("");
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  /*====================
  Load roboflow detected ingredients to the ingredients array
  ====================*/
  useEffect(() => {
    if (haveIngredients) {
      setIngredients(haveIngredients);
      console.log("RecipesByIngredients haveIngredients", haveIngredients);
      console.log("RecipesByIngredients ingredients", ingredients);
    }
  }, [haveIngredients]);

  /*====================
  Fetch ingredient options from Airtable
  ====================*/
  useEffect(() => {
    //
    fetch(import.meta.env.VITE_AIRTABLE, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`,
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Transform the retrieved data into the expected format
        const transformedOptions = data.records.map((record) => ({
          value: record.fields.ingredient,
          label: record.fields.ingredient,
        }));
        setIngredientOptions(transformedOptions);
        if (data.offset) {
          //insert recursive call to go all the way to the 1000 items
        }
      })
      .catch((error) => {
        console.error("Error fetching ingredient options:", error);
      });
  }, []); // Using Empty dependency array to fetch data only once

  return (
    <>
      <Ingredients></Ingredients>

      <br />
      <Upload></Upload>
      <br />
      <div>
        <h2>Ingredients</h2>
        <Select
          options={ingredientOptions}
          value={searchValue}
          onChange={handleSelectIngredient}
        />
      </div>
      <br />

      {console.log(ingredients)}
      <div className={styles.container}>
        {ingredients.map((ingredient, index) => (
          <ul
            className="list-group list-group-flush border border-warning rounded"
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
    </>
  );
};

export default RecipesByIngredients;
