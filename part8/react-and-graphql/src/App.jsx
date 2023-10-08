import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Menu from "./components/Menu";

const App = () => {
  return (
    <>
      <Menu />

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/newbook" element={<NewBook />} />

        <Route path="/" element={<Navigate to="/authors" />} />
      </Routes>
    </>
  );
};

export default App;
