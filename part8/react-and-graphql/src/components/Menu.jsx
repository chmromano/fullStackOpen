import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ logout, token }) => {
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
      {token ? (
        <>
          <Link style={padding} to="/newbook">
            New book
          </Link>
          <Link style={padding} to="/recommended">
            Recommended
          </Link>
          <button style={padding} onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <Link style={padding} to="/login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Menu;
