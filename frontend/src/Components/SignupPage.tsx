import { SubmissionStatus } from "@/Components/AddCard.tsx";
import { httpClient } from "@/Services/HttpClient.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";


export const SignupPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [exists, setExists] = useState(false);
  const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);

  
  function handleSubmit(e) {
    e.preventDefault();

    if (!exists) {
      httpClient.post("/users", {"email": user.email, "username": user.email})
        .then( (response) => {
          if (response.status === 200) {
            setSubmitted(SubmissionStatus.SubmitSucceeded);
            setExists(true);
          }
        }).catch(err => {
        setSubmitted(SubmissionStatus.SubmitFailed);
        console.log("unable to create an account for this user: ", err.message);
      });
    }
  }
  

  return exists && isAuthenticated ?
    (
    <div>
      <h1 className={"mt-5"}>Pokemon Card Collector!</h1>
      <h2 className={"text-info-emphasis mt-5"}>Let's get started...</h2>
      <img src={"../src/assets/images/signup_image.jpg"} className={"mt-5"}/>
    </div>
    )
    :
    (
      <form onSubmit={handleSubmit} className="mt-5">
        <label>
          <h1>To start your collection you'll need an account!</h1>
          <br />
          <label>Email Address:</label>
          <input className={"m-5"} type="text" readOnly={false} placeholder="email@email.com" />
        </label>
        <br />
        <button type="submit" className="m-5 px-5">Create Account</button>
        {
          submitted === SubmissionStatus.SubmitFailed &&
          <div>
            <h3 className="text-danger mt-5">Unable to create your account</h3>
            <h4 className="text-danger">Maybe you already have this one?</h4>
          </div>
        }
        {
          submitted === SubmissionStatus.SubmitSucceeded &&
          <h3 className="text-success mt-5">Account created!</h3>
        }
      </form>
    )
  
};
