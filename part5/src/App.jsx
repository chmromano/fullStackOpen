import React, { useEffect, useState } from "react";
import BlogList from "./components/BlogList";
import LoggedUser from "./components/LoggedUser";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (user !== null) {
      (async () => {
        const response = await blogService.getAll();
        setBlogs(response);
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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        password,
        username,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem(
        "loggedBlogListAppUser",
        JSON.stringify(user)
      );
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("Incorrect credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogListAppUser");

    blogService.setToken(null);

    setUser(null);
    setBlogs([]);
  };

  return (
    <>
      <Notification message={errorMessage} />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <>
          <h2>Blogs</h2>
          <LoggedUser user={user} handleLogout={handleLogout} />
          <BlogList blogs={blogs} />
        </>
      )}
    </>
  );
};

export default App;
