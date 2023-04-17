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
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user !== null) {
      (async () => {
        const blogs = await blogService.getAll();
        setBlogs(blogs.sort((a, b) => b.likes - a.likes));
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
      <Notification message={message} />

      {user === null ? (
        <LoginForm setUser={setUser} setMessage={setMessage} />
      ) : (
        <>
          <h2>Blog list application</h2>
          <LoggedUser
            user={user}
            setUser={setUser}
            setBlogs={setBlogs}
            setMessage={setMessage}
          />
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
            setMessage={setMessage}
          />
          <BlogList
            user={user}
            blogs={blogs}
            setBlogs={setBlogs}
            setMessage={setMessage}
          />
        </>
      )}
    </>
  );
};

export default App;
