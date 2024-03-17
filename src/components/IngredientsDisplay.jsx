import React from "react";
import styles from "./RecipeDisplay.module.css";

const IngredientsDisplay = (props) => {
  //get the URL of the specific recipe and open in a new browser tab
  const handleClick = async (recipeID) => {
    try {
      const url = new URL(
        "https://api.spoonacular.com/recipes/" + recipeID + "/information"
      );
      url.searchParams.append("includeNutrition", "false");
      console.log(url);

      const recipeIdQueryRes = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-key": import.meta.env.VITE_SPOONACULAR_API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (recipeIdQueryRes.ok) {
        console.log("Succesfully load recipes");
        const data = await recipeIdQueryRes.json();
        console.log(data.sourceUrl);
        window.open(data.sourceUrl, "_blank");
      } else {
        console.log("Failed to load recipes");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <td>
      <article className={styles.article}>
        {/************ RECIPE IMAGE ************/}
        {/************ using rel="noopener" target="_blank" so link open on a new tab************/}
        <img
          alt="Recipe Image"
          src={props.image}
          width="250"
          height="250"
        ></img>
        <br />
        {/************ RECIPE SOURCE NAME WITH LINK ************/}
        <div>
          <button
            className="btn btn-primary mb-2"
            style={{ backgroundColor: "black", borderColor: "black" }}
            onClick={() => handleClick(props.recipeID)}
          >
            Get me to this recipe
          </button>
        </div>
        {/************ RECIPE TITLE WITH LINK ************/}
        <h4>{props.title}</h4>
        <tr>
          <td>
            <label>
              <strong>Ingredients used:</strong> {props.usedIngredientCount}
            </label>
          </td>
          <td>
            <label>
              {" "}
              <strong>Unused:</strong> {props.unusedIngredients.length}
            </label>
          </td>

          {/* <td>
            <label>
              <strong> Missed:</strong> {props.missedIngredientCount}
            </label>
          </td> */}
        </tr>
        <strong>Missed:</strong> {props.missedIngredientCount}
        {console.log(props.missedIngredients)}
        {/************ MISSED INGREDIENTS LIST ************/}
        <ul className="list-group list-group-flush">
          {props.missedIngredients.map((missedIngredient, index) => (
            <li className="list-group-item" key={index}>
              <span>{missedIngredient.amount}</span>
              <span>{missedIngredient.unitShort}</span>{" "}
              <span>{missedIngredient.name}</span>
            </li>
          ))}
        </ul>
      </article>
    </td>
  );
};

export default IngredientsDisplay;
