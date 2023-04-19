import React, { useEffect, useRef, useState } from "react";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import LoggedUser from "./components/LoggedUser";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

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

      setMessage({ error: false, text: "Successfully logged in" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage({ error: true, text: "Incorrect credentials" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem("loggedBlogAppUser");

      blogService.setToken(null);

      setUser(null);
      setBlogs([]);

      setMessage({ error: false, text: "Successfully logged out" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage({ error: true, text: "Incorrect credentials" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);

      setBlogs(
        blogs.concat({
          ...returnedBlog,
          user: {
            id: returnedBlog.user,
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

  const handleDeleteBlog = async (blogObject) => {
    try {
      if (
        window.confirm(
          `Deleting "${blogObject.title}" by ${blogObject.author}. Confirm?`
        )
      ) {
        await blogService.remove(blogObject.id);

        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));

        setMessage({
          error: false,
          text: `Blog "${blogObject.title}" deleted`,
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    } catch (error) {
      setMessage({ error: true, text: "Something went wrong" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLikeBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject.id, {
        ...blogObject,
        likes: blogObject.likes + 1,
        user: blogObject.user.id,
      });

      setBlogs(
        blogs
          .map((blog) => {
            if (blog.id === returnedBlog.id) {
              blog.likes++;
            }
            return blog;
          })
          .sort((a, b) => b.likes - a.likes)
      );
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
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <h2>Blog list application</h2>
          <LoggedUser user={user} onLogout={handleLogout} />
          <BlogForm onCreate={handleCreateBlog} blogFormRef={blogFormRef} />
          <BlogList
            user={user}
            blogs={blogs}
            onDelete={handleDeleteBlog}
            onLike={handleLikeBlog}
          />
        </>
      )}
    </>
  );
};

export default App;
