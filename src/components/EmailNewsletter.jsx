import React, { useState } from "react";
import styles from "./Recipe.module.css";

const EmailNewsletter = () => {
  const [inputEmail, setInputEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_AIRTABLE + "emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                email: inputEmail,
              },
            },
          ],
        }),
      });

      if (response.ok) {
        console.log("Email submitted successfully");
        alert("Email added! Wait to hear from us soon!");
      } else {
        console.log("Oops...Something went wrong! Failed to submit email");
        // Handle failure case here
      }
    } catch (error) {
      console.error("Error submitting email:", error);
    }
  };

  return (
    <div className={styles.newsletter}>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6 centered">
            <form onSubmit={handleSubmit} className="centered">
              <input
                size="40"
                type="email"
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
                Sign up for our Newsletter!
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailNewsletter;
