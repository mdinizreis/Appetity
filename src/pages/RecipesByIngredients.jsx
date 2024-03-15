import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import Ingredients from "../components/Ingredients";

const RecipesByIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [ingredientOptions, setIngredientOptions] = useState([]);

  const location = useLocation();
  const haveIngredients = location.state?.haveIngredients ?? null;
  // if (haveIngredients) {
  //   setIngredients([...ingredients, haveIngredients]);
  //   console.log("RecipesByIngredients", haveIngredients);
  // }

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

  useEffect(() => {
    // Fetch ingredient options from Airtable
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
      })
      .catch((error) => {
        console.error("Error fetching ingredient options:", error);
      });
  }, []); // Empty dependency array to fetch data only once

  return (
    <>
      <Ingredients></Ingredients>

      <br />

      <div>
        <h2>Ingredients</h2>
        <Select
          options={ingredientOptions}
          value={searchValue}
          onChange={handleSelectIngredient}
        />
        {console.log(ingredients)}
        <ul className="list-group list-group-flush">
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient}
              <button
                className="btn btn-danger btn-sm rounded-circle pl-10"
                type="button"
                data-toggle="tooltip"
                data-placement="top"
                title="Delete"
                onClick={() => handleRemoveIngredient(index)}
              >
                -
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default RecipesByIngredients;
