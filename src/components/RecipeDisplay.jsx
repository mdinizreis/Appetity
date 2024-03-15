import React from "react";
import styles from "./RecipeDisplay.module.css";

const RecipeDisplay = (props) => {
  return (
    <td>
      <article className={styles.article}>
        {/************ RECIPE IMAGE ************/}
        <a href={props.url}>
          <img
            alt="Recipe Image"
            src={props.image}
            width="250"
            height="250"
          ></img>
        </a>
        <br />
        {/************ RECIPE SOURCE NAME WITH LINK ************/}
        <a href={props.url}>{props.source}</a>

        {/************ RECIPE TITLE WITH LINK ************/}
        <a href={props.url}>
          <h4>{props.label}</h4>
        </a>
        <tr>
          <td>
            <label>
              <strong>Cal:</strong> {Math.round(parseFloat(props.calories))}{" "}
              kcal
            </label>
          </td>
          <td>
            <label>
              {" "}
              <strong>Yield:</strong> {props.yield}
            </label>
          </td>

          <td>
            <label>
              <strong> Time:</strong> {props.totalTime} min
            </label>
          </td>
        </tr>
        {/************ RECIPE'S INGREDIENTS LIST ************/}
        <ul className="list-group list-group-flush">
          {props.ingredientLines.map((ingredient, index) => (
            <li className="list-group-item" key={index}>
              <span>{ingredient}</span>
            </li>
          ))}
        </ul>
      </article>
    </td>
  );
};

export default RecipeDisplay;
