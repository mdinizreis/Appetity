import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./Upload.module.css";
import axios from "axios";

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [fileBase64, setFileBase64] = useState();
  //loading spinner variables
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //variable for the preview of image on select
  const [preview, setPreview] = useState();

  /*====================
    BASE64 ENCODING THE UPLOADED IMAGE (REQUIRED BY ROBOFLOW API)
    Base64 encoding converts the image into a readable string
    ====================*/
  const convertToBase64 = () => {
    //check if the file is valid. Blob (Binary Large Object) object represents a chunk of binary data representing the image file.
    if (file instanceof Blob) {
      setIsLoading(true);
      setError(null);
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
      /*====================
      Using ROBOFLOW Object Detection AI Computer Vision Model to detect ingredients from uploaded photo.
      API Documentation: https://docs.roboflow.com/deploy/hosted-api/object-detection
      ====================*/
      axios({
        method: "POST",
        url: import.meta.env.VITE_ROBOFLOW,
        params: {
          api_key: import.meta.env.VITE_ROBOFLOW_API_KEY,
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
          //Remove duplicates: create new array with ingredients[] unique values
          ingredientsPrediction = [...new Set(ingredientsPrediction)];
          console.log("Upload ingredients prediction: ", ingredientsPrediction);
          setIsLoading(false);
          navigate("/RecipesByIngredients", {
            state: { haveIngredients: ingredientsPrediction },
          });
          console.log("3-Reached Successful response");
        })
        .catch(function (error) {
          setError(error.message);
          console.log(error.message);
          console.log("4-NO RESPONSE");
        });
    }
  }, [fileBase64]);

  const handleUploadClick = (event) => {
    event.preventDefault();
    setPreview();
    convertToBase64();
    console.log("2-Reached handleUploadClick");
  };

  const handleOnChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

    /*====================
    LOGIC TO SHOW IMAGE PREVIEW ON SELECTION
    FileReader reads the content of the file
    render.onloaded is an anonymous function to assign the data URL representing the file contents to preview variable
    reader.readAsDataURL(file) method is used to read the contents of the file as a data URL.
    ====================*/
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    /*====================
    UPLOAD FILE LABELS & BUTTON
    Submit button (Upload) will call the function to kick off the API call for Ingredients detection
    ====================*/
    <div className={styles.card}>
      <div className="card mb-3" style={{ minHeight: "18rem" }}>
        <div className="row g-0">
          <div className="col-md-6 centered">
            <div className="card-body">
              <h4 className="card-title text-start">
                Find Recipes With What You Have
              </h4>
              <p className="card-text text-start">
                Don't know what to make? No problem, take photo of your
                ingredients and we will detect what you have to search thousands
                of recipes you can make.
              </p>
              <p className="card-text text-start">
                <small className="text-muted">
                  If we miss anything you can still add it manually to the list!
                </small>
              </p>
            </div>
          </div>
          <div className="col-md-6 centered">
            <form onSubmit={handleUploadClick} className="centered">
              <div className="input-group">
                <input
                  className="form-control"
                  id="inputGroupFile04"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                  type="file"
                  accept="image/png, image/jpg, image/bmp" //only allow upload files of these image types, as per ROBOFLOW requirements
                  onChange={handleOnChange}
                />
                <button
                  type="submit"
                  className="btn btn-primary mb-2"
                  id="inputGroupFileAddon04"
                >
                  Detect Ingredients
                </button>
              </div>
            </form>
          </div>
        </div>

        {isLoading && (
          <div className="centered">
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && error && <p>{error}</p>}

        {preview && (
          <div className="centered">
            <div className="col-md-12">
              <p className="text-muted text-start">
                {file && `Type: ${file.type}`}
              </p>
              <p className={styles.upload}>
                <img src={preview} alt="Upload preview" />
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
