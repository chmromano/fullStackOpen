import React, { useState } from "react";
import blogService from "./../services/blogs";
import loginService from "./../services/login";

const LoginForm = ({ setUser, setErrorMessage }) => {
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
    } catch {
      setErrorMessage("Incorrect credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
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
  );
};

export default LoginForm;
