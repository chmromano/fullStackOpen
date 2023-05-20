import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setNotification } from "../reducers/notificationReducer";
import { clearUser } from "../reducers/loginReducer";
import { clearBlogs } from "../reducers/blogReducer";
import { clearUsers } from "../reducers/userReducer";

import blogService from "../services/blogs";

const LoggedUser = () => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.setToken(null);
    dispatch(clearUser());
    dispatch(clearUsers());
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
        <button onClick={handleLogout}>Logout</button>
      </p>
    </>
  );
};

export default LoggedUser;
