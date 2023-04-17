import React from "react";
import blogService from "./../services/blogs";

const LoggedUser = ({ user, setUser, setBlogs, setMessage }) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogListAppUser");

    blogService.setToken(null);

    setUser(null);
    setBlogs([]);

    setMessage({ error: false, text: "Successfully logged out" });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <>
      <p>
        Logged in as {user.name}
        <br />
        <button onClick={handleLogout}>Logout</button>
      </p>
    </>
  );
};

export default LoggedUser;
