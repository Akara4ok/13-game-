import React, { useState, useEffect } from "react";
import classes from "./App.module.scss";
import Layout from "./Components/Layout/Layout";

function App() {
  return (
    <div className={classes.container}>
      <Layout />
    </div>
  );
}

export default App;
