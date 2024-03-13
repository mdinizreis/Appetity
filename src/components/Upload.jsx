import React, { useState, useEffect } from "react";
import axios from "axios";

const Upload = () => {
  const [results, setResults] = useState();
  const [file, setFile] = useState();
  const [fileBase64, setFileBase64] = useState();

  /*====================
    BASE64 ENCODING THE UPLOADED IMAGE (REQUIRED BY ROBOFLOW API)
    Base64 encoding converts the image into a readable string
    ====================*/
  const convertToBase64 = () => {
    //check if the file is valid. Blob (Binary Large Object) object represents a chunk of binary data representing the image file.
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFileBase64(reader.result);
      };
    } else {
      console.log("Invalid File");
      alert("Invalid File! Please upload an image file");
    }
  };

  /*====================
    ENSURES (UseEffect) API CALL IS ONLY EXECUTED WHEN UPLOADED IMAGE IS PROCESSED (fileBase64 has proper data)
    useEffect hook that watches for changes in the fileBase64 state using the dependency array [fileBase64].
    When fileBase64 changes (i.e., when it receives the proper data), the useEffect hook is triggered, and the API call is executed.
    ====================*/
  useEffect(() => {
    if (fileBase64) {
      //API Documentation: https://docs.roboflow.com/deploy/hosted-api/object-detection
      //Inference Test Web App https://detect.roboflow.com/?model=appetity&version=2&api_key=DP7mVPDXbkpd2q9mS1hU
      axios({
        method: "POST",
        url: "https://detect.roboflow.com/appetity/2",
        params: {
          api_key: "DP7mVPDXbkpd2q9mS1hU",
          confidence: 30,
        },
        data: fileBase64,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then(function (response) {
          console.log(response.data);
          let ingredientsPrediction = [];
          response.data.predictions.map((prediction) =>
            ingredientsPrediction.push(prediction.class)
          );
          ingredientsPrediction = [...new Set(ingredientsPrediction)]; //Remove duplicates: create new array with ingredients[] unique values
          setResults(ingredientsPrediction);
          // setResults(response.data);
          console.log("3-Reached Successful response");
        })
        .catch(function (error) {
          console.log(error.message);
          console.log("4-NO RESPONSE");
        });
    }
  }, [fileBase64]);

  const handleUploadClick = (event) => {
    event.preventDefault();
    convertToBase64();
    console.log("2-Reached handleUploadClick");
  };

  return (
    /*====================
    UPLOAD FILE LABELS & BUTTON
    Submit button (Upload) will call the function to kick off the API call for Ingredients detection
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
            Detect Ingredients
          </button>
          <div>{file && `Type: ${file.type}`}</div>
        </form>
      </div>
      <h3>Response:</h3>
      <p>{JSON.stringify(results)}</p>
    </div>
  );
};

export default Upload;
