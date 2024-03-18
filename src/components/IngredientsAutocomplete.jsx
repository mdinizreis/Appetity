import React, { useState, useEffect } from "react";
import Select from "react-select";

const IngredientsAutocomplete = (props) => {
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [offset, setOffset] = useState();

  /*====================
  AIRTABLE API GET TO RETRIEVE INGREDIENT OPTIONS - SUBSEQUENT API CALLS (PAGINATION)
  Airtable only returns 100 records per call so multiple calls need to be done to retrieve all records in the table 
  Each call returns a 'offset' parameter that is used on the next call (so it can continues retrieving records from where it left on the previous)
  getNextPage() receives the offset value after the first API call and recursevely calls itself until there is no more offset being returned (reached end of records)
  Check List Records > Pagination for more info: https://airtable.com/appO4hsxlcXJe17xz/api/docs#curl/table:ingredients:list
  ====================*/

  const getNextPage = (offset) => {
    fetch(import.meta.env.VITE_AIRTABLE + "ingredients" + "?offset=" + offset, {
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
        setIngredientOptions((prevOptions) => [
          ...prevOptions,
          ...transformedOptions,
        ]);
        if (data.offset) {
          setOffset(data.offset);
          getNextPage(data.offset);
        }
      })
      .catch((error) => {
        console.error("Error fetching ingredient options:", error);
      });
  };

  /*====================
  AIRTABLE API GET TO RETRIEVE INGREDIENT OPTIONS - FIRST API CALL
  First API fetch to be executed as page loads. If there are more than 100 records use the offset parameter returned to call getNextPage() function
  Transform the retrieved data into the expected format for the dropdown and add it to the IngredientOptions array
  Documentation: https://airtable.com/appO4hsxlcXJe17xz/api/docs#curl/table:ingredients:list
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
        setIngredientOptions((prevOptions) => [
          ...prevOptions,
          ...transformedOptions,
        ]);
        if (data.offset) {
          setOffset(data.offset);
          getNextPage(data.offset);
        }
      })
      .catch((error) => {
        console.error("Error fetching ingredient options:", error);
      });
  }, []); // Using Empty dependency array to fetch data only once

  return (
    /*====================
  INGREDIENTS DROPDOWN LIST & 'FIND MY RECIPE' BUTTON
  Dropdown will receive its content from Airtable API call
  on each dropdown selection call (lifting) parent funtion handleSelectIngredient to update the ingredient list accordingly
  on submit ('find my recipe' button) calls (lifting) parent function
  ====================*/

    <div className="card-body" style={{ height: "7rem", fontFamily: "Roboto" }}>
      <h4 className="card-title">What Ingredients do you have?</h4>
      <h6 className="card-subtitle mb-2 text-muted">
        Have we missed anything? Search below to add it manually and click on
        the button!
      </h6>
      <div className="row g-0">
        <div className="col-md-12">
          {/* lifting to parent funtion */}
          <form onSubmit={props.handleSubmit}>
            <div className="input-group">
              <Select
                style={{ minWidth: "225px" }}
                placeholder="Add more ingredients to your list..."
                options={ingredientOptions}
                value={searchValue}
                onChange={props.handleSelectIngredient} //lifting to parent funtion
              />
              <button
                type="submit"
                className="btn btn-primary mb-2"
                style={{ backgroundColor: "black", borderColor: "black" }}
              >
                Find My Recipes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IngredientsAutocomplete;
