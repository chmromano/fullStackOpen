import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 20,
  };

  return (
    <div>
      <Link style={padding} to="/authors">
        Authors
      </Link>
      <Link style={padding} to="/books">
        Books
      </Link>
      <Link style={padding} to="/newbook">
        New book
      </Link>
    </div>
  );
};

export default Menu;
