import React, { useEffect, useState } from "react";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import LoggedUser from "./components/LoggedUser";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (user !== null) {
      (async () => {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      })();
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <>
      <Notification message={errorMessage} />

      {user === null ? (
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
      ) : (
        <>
          <h2>Blogs</h2>
          <LoggedUser user={user} setUser={setUser} setBlogs={setBlogs} />
          <BlogForm blogs={blogs} setBlogs={setBlogs} />
          <BlogList blogs={blogs} />
        </>
      )}
    </>
  );
};

export default App;
