import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const Main = React.lazy(() => import("./pages/Main"));
const RecipesSearch = React.lazy(() => import("./pages/RecipesSearch"));
const RecipesByIngredients = React.lazy(() =>
  import("./pages/RecipesByIngredients")
);
const NotFound = React.lazy(() => import("./pages/NotFound"));
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Suspense fallback={<h1>loading...</h1>}>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Navigate replace to="/main" />} />
          <Route path="main" element={<Main />} />
          <Route path="RecipesSearch" element={<RecipesSearch />} />
          <Route
            path="RecipesByIngredients"
            element={<RecipesByIngredients />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
