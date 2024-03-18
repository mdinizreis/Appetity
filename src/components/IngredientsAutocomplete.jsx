import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./Upload.module.css";

const IngredientsAutocomplete = (props) => {
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  /*====================
  Fetch ingredient options from Airtable
  ====================*/
  useEffect(() => {
    fetch(import.meta.env.VITE_AIRTABLE + "ingredients", {
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
    <div className="card-body" style={{ height: "7rem", fontFamily: "Roboto" }}>
      <h4 className="card-title">What Ingredients do you have?</h4>
      <h6 className="card-subtitle mb-2 text-muted">
        Have we missed anything? Search below to add it manually and click on
        the button!
      </h6>
      <div className="row g-0">
        <div className="col-md-12">
          <form onSubmit={props.handleSubmit}>
            <div className="input-group">
              <Select
                style={{ minWidth: "225px" }}
                placeholder="Add more ingredients to your list..."
                options={ingredientOptions}
                value={searchValue}
                onChange={props.handleSelectIngredient} //lifting
              />
              <div className={styles.card}>
                <button type="submit" className="btn btn-primary mb-2">
                  Find My Recipes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IngredientsAutocomplete;
