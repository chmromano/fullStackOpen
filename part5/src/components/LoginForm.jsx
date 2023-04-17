import React, { useState } from "react";
import blogService from "./../services/blogs";
import loginService from "./../services/login";

const LoginForm = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

      setMessage({ error: false, text: "Successfully logged in" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch {
      setMessage({ error: true, text: "Incorrect credentials" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <h2>Log in to the application</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <br />
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
