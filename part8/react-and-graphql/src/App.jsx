import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Notify from "./components/Notify";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Menu from "./components/Menu";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <>
      <Notify errorMessage={errorMessage} />

      <Menu />

      <Routes>
        <Route path="/authors" element={<Authors setError={notify} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/newbook" element={<NewBook setError={notify} />} />

        <Route path="/" element={<Navigate to="/authors" />} />
      </Routes>
    </>
  );
};

export default App;
