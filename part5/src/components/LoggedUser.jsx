import PropTypes from "prop-types";
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
        Logged in as {user.username}
        <br />
        <button onClick={handleLogout}>Logout</button>
      </p>
    </>
  );
};

LoggedUser.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default LoggedUser;
