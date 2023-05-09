import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 20,
  };

  return (
    <>
      <Link style={padding} to="/">
        Anecdotes
      </Link>
      <Link style={padding} to="/create">
        Create new
      </Link>
      <Link style={padding} to="/about">
        About
      </Link>
    </>
  );
};

export default Menu;
