"use es6";

import React, { useEffect, useState } from "react";
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
    <div id="Admin">
      <h1>Admin</h1>
      {JSON.stringify(content)}
    </div>
  );
}

export default Admin;
