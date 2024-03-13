import React from "react";

const RecipeDisplay = (props) => {
  console.log("Yield: ", props.yield);
  console.log("Total Time: ", props.totalTime);
  console.log("Calories: ", Math.round(parseFloat(props.calories)));
  //   console.log("Ingredients", props.ingredientLines.length);

  return (
    <article>
      {/* recipe image */}
      <a href={props.url}>
        <img
          alt="Recipe Image"
          src={props.image}
          width="200"
          height="200"
        ></img>
      </a>
      <br />
      {/* Source name with link */}
      <a href={props.url}>{props.source}</a>
      {/* Recipe Title with link*/}
      <h3>
        <a href={props.url}>{props.label}</a>
      </h3>
      <label>Calories: {Math.round(parseFloat(props.calories))}</label>
      <br />
      <label>Portions: {props.yield}</label>
      <br />
      <label>Total Time: {props.totalTime}</label>
      {/* Ingredients List */}
      <ul>
        {props.ingredientLines.map((ingredient, index) => (
          <li key={index}>
            <span>{ingredient}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default RecipeDisplay;
