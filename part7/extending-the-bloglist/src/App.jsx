import React, { useEffect, useRef } from "react";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import LoggedUser from "./components/LoggedUser";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

  const blogFormRef = useRef();

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs());
    }
  }, [user, dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <>
      <Notification />

      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <h2>Blog list application</h2>
          <LoggedUser />
          <BlogForm blogFormRef={blogFormRef} />
          <BlogList />
        </>
      )}
    </>
  );
};

export default App;
