import React from "react";
import blogService from "./../services/blogs";

const LoggedUser = ({ user, setUser, setBlogs }) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogListAppUser");

    blogService.setToken(null);

    setUser(null);
    setBlogs([]);
  };

  return (
    <>
      <p>
        Logged in as {user.name}
        <button onClick={handleLogout}>Logout</button>
      </p>
    </>
  );
};

export default LoggedUser;
