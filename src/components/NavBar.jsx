import React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <img
              src="./appetity-Logo-Reduced.png"
              width="150"
              height="47"
              className="d-inline-block align-top"
              alt=""
            ></img>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/main"
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/RecipesSearch"
            >
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/RecipesByIngredients"
            >
              Ingredients
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
