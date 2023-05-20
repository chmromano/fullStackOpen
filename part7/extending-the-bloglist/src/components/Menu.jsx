import React from "react";
import { Link } from "react-router-dom";

import LoggedUser from "./LoggedUser";

const Menu = () => {
  const padding = {
    paddingRight: 20,
  };

  return (
    <div>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      <LoggedUser />
    </div>
  );
};

export default Menu;
