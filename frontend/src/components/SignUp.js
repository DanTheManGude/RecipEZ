"use es6";

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

function SignUp(props) {
  const { setUserId } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleName = (e) => {
    setUsername(e.target.value);
  };

  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("createUser", {
        username: username,
        password: password,
      });
      if (response.status == 200) {
        setSuccess(true);
        setUserId(response.data.id);
      } else {
        console.log("no");
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="sign-up">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={handleName} />
        <input type="password" value={password} onChange={handlePass} />
        <input type="submit" value="Sign Up" />
      </form>
      {error && <span>Username already taken.</span>}
      {success && <Redirect to="/signin" />}
    </div>
  );
}

export default SignUp;
