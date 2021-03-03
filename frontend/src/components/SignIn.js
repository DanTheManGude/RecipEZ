"use es6";

import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import API from "../utils/API";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleName = (e) => {
    setUsername(e.target.value);
  }

  const handlePass = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("signinUser", {
        "username": username,
        "password": password
      });
      if (response.status == 200) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="sign-in">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={handleName} />
        <input type="password" value={password} onChange={handlePass} />
        <input type="submit" value="Sign In" />
      </form>
      { error && <span>Incorrect username or password.</span> }
      { success && <Redirect to="/home" />}
    </div>
  );
}

export default SignIn;
