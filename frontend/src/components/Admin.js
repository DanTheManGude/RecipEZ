"use es6";

import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import API from "../utils/API";

function Admin() {
  const [content, setContent] = useState({});

  useEffect(() => {
    API.get("revision")
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="page" id="Admin">
      <Typography variant="h4">Admin</Typography>
      {JSON.stringify(content)}
    </div>
  );
}

export default Admin;
