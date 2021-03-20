"use es6";

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import API from "../utils/API";

function SignIn(props) {
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
      const response = await API.post("signinUser", {
        username: username,
        password: password,
      });
      if (response.status == 200) {
        setSuccess(true);
        setUserId(response.data.id);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page" id="sign-in">
      <Typography variant="h4">Sign In</Typography>
      <form onSubmit={handleSubmit}>
        <TextField type="text" value={username} label="Username" onChange={handleName} />
        <TextField type="password" value={password} label="Password" onChange={handlePass} />
        <Button type="submit">Sign Up</Button>
      </form>
      {error && <span>Incorrect username or password.</span>}
      {success && <Redirect to="/home" />}
    </div>
  );
}

export default SignIn;
