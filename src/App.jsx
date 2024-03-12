import React from "react";
import Upload from "./components/Upload";
import Recipe from "./components/Recipe";
import Ingredients from "./components/Ingredients";

function App() {
  return (
    <div>
      <div className="text-center">
        <img className="img-fluid" src="./appetity-Logo-Reduced.png"></img>
      </div>

      <Upload></Upload>
      <br />
      <Ingredients></Ingredients>
      <br />
      <Recipe></Recipe>
    </div>
  );
}

export default App;
