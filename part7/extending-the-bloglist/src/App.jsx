import React, { useEffect, useRef, useState } from "react";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import LoggedUser from "./components/LoggedUser";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import {
  clearBlogs,
  createBlog,
  deleteBlog,
  initializeBlogs,
  likeBlog,
} from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

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
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      dispatch(
        setNotification({ error: false, text: "Successfully logged in" }, 5000)
      );
    } catch (error) {
      dispatch(
        setNotification({ error: true, text: "Something went wrong" }, 5000)
      );
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogAppUser");

    blogService.setToken(null);

    setUser(null);
    dispatch(clearBlogs());
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject, user));

      blogFormRef.current.toggleVisibility();

      dispatch(
        setNotification(
          {
            error: false,
            text: `Successfully added blog "${blogObject.title}" by ${blogObject.author}`,
          },
          5000
        )
      );
    } catch (error) {
      dispatch(
        setNotification({ error: true, text: "Something went wrong" }, 5000)
      );
    }
  };

  const handleDeleteBlog = async (blogObject) => {
    try {
      if (
        window.confirm(
          `Deleting "${blogObject.title}" by ${blogObject.author}. Confirm?`
        )
      ) {
        dispatch(deleteBlog(blogObject.id));

        dispatch(
          setNotification(
            {
              error: false,
              text: `Blog "${blogObject.title}" deleted`,
            },
            5000
          )
        );
      }
    } catch (error) {
      dispatch(
        setNotification({ error: true, text: "Something went wrong" }, 5000)
      );
    }
  };

  const handleLikeBlog = async (blogObject) => {
    try {
      dispatch(likeBlog(blogObject));

      dispatch(
        setNotification(
          {
            error: false,
            text: `Liked blog "${blogObject.title}" by ${blogObject.author}`,
          },
          5000
        )
      );
    } catch (error) {
      dispatch(
        setNotification({ error: true, text: "Something went wrong" }, 5000)
      );
    }
  };

  return (
    <>
      <Notification />

      {user === null ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <h2>Blog list application</h2>
          <LoggedUser user={user} onLogout={handleLogout} />
          <BlogForm onCreate={handleCreateBlog} blogFormRef={blogFormRef} />
          <BlogList
            user={user}
            onDelete={handleDeleteBlog}
            onLike={handleLikeBlog}
          />
        </>
      )}
    </>
  );
};

export default App;
