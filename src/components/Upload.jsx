import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [results, setResults] = useState();
  const [file, setFile] = useState([]);

  const handleUploadClick = (event) => {
    event.preventDefault();

    console.log("2-Reached handleUploadClick");
    axios({
      method: "POST",
      url: "https://detect.roboflow.com/appetity/2",
      params: {
        api_key: "DP7mVPDXbkpd2q9mS1hU",
        image:
          "https://media.istockphoto.com/id/924476838/photo/delicious-pizza-with-ingredients-and-spices.jpg?s=2048x2048&w=is&k=20&c=I65rinzAfm6Q9rG4CGtvsYk8txtRfGtpGzP3QURqv0k=",
      },
    })
      .then(function (response) {
        console.log(response.data);
        setResults(response.data);
        console.log("3-Reached Successful response");
      })
      .catch(function (error) {
        console.log(error.message);
        console.log("4-NO RESPONSE");
      });
  };

  return (
    /*====================
    UPLOAD FILE LABELS, BROWSE AND SUBMIT
    ====================*/
    <div className="card">
      <div className="card-header">GET INGREDIENTS BASED ON IMAGE UPLOAD</div>
      <div className="card-body">
        <h5 className="card-title">Roboflow API</h5>
        <p className="card-text">
          Using Roboflow Object Detection AI Computer Vision Model to detect
          ingredients from uploaded photo.{" "}
          <a href="https://docs.roboflow.com/deploy/hosted-api/object-detection">
            Documentation
          </a>
        </p>
        <form onSubmit={handleUploadClick}>
          <input
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          />
          <button type="submit" className="btn btn-primary mb-2">
            Call Roboflow
          </button>
          <div>{file && `${file.name} - ${file.type}`}</div>
        </form>
      </div>
      <h3>Response:</h3>
      <p>{JSON.stringify(results)}</p>
    </div>
  );
};

export default Upload;
