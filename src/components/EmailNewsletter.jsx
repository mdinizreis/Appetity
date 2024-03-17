import React, { useState } from "react";
import styles from "./Recipe.module.css";

const EmailNewsletter = () => {
  const [inputEmail, setInputEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch(import.meta.env.VITE_AIRTABLE, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`,
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Transform the retrieved data into the expected format
        const transformedOptions = data.records.map((record) => ({
          value: record.fields.ingredient,
          label: record.fields.ingredient,
        }));
        setIngredientOptions(transformedOptions);
      })
      .catch((error) => {
        console.error("Error submitting email:", error);
      });
  };
  return (
    <div className={styles.card}>
      <div className="card mb-3" style={{ height: "18rem" }}>
        <div className="row g-0">
          <div className="col-md-6 centered">
            <form onSubmit={handleSubmit} className="centered">
              <input
                size="40"
                type="text"
                value={inputEmail}
                onChange={(event) => {
                  setInputEmail(event.target.value);
                }}
                placeholder="your@email.com"
              />
              <button type="submit" className="btn btn-primary mb-2">
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-6 centered">
            <div className="card-body">
              <h4 className="card-title text-start">
                Sign up to our Newsletter!
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailNewsletter;
