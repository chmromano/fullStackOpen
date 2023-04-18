import React, { useEffect, useRef, useState } from "react";
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

  const blogFormRef = useRef();

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

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(
        blogs.concat({
          ...returnedBlog,
          user: {
            name: user.name,
            username: user.username,
          },
        })
      );
      blogFormRef.current.toggleVisibility();

      setMessage({
        error: false,
        text: `Successfully added blog "${returnedBlog.title}" by ${returnedBlog.author}`,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage({ error: true, text: "Something went wrong" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

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
          <BlogForm createBlog={addBlog} blogFormRef={blogFormRef} />
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
