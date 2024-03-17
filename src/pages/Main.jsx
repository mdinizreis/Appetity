import React from "react";
import Upload from "../components/Upload";
import Recipe from "../components/Recipe";
import EmailNewsletter from "../components/EmailNewsletter";

const Main = () => {
  return (
    <>
      <Recipe></Recipe>
      <Upload></Upload>
      <EmailNewsletter></EmailNewsletter>
    </>
  );
};

export default Main;
