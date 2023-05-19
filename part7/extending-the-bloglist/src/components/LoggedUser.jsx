import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";
import { clearBlogs } from "../reducers/blogReducer";
import blogService from "../services/blogs";

const LoggedUser = () => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.setToken(null);
    dispatch(setUser(null));
    dispatch(clearBlogs());
    dispatch(
      setNotification({ error: false, text: "Successfully logged out" }, 5000)
    );
  };

  return (
    <>
      <p>
        Logged in as {user.username}
        <br />
        <button id="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </p>
    </>
  );
};

export default LoggedUser;
