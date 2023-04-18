import React, { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ onLogin }) => {
  const emptyUser = { password: "", username: "" };

  const [user, setUser] = useState(emptyUser);

  const handleLogin = (event) => {
    event.preventDefault();

    onLogin(user);

    setUser(emptyUser);
  };

  return (
    <>
      <h2>Log in to the application</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <br />
        <input
          type="text"
          value={user.username}
          name="username"
          id="username"
          onChange={({ target }) =>
            setUser({ ...user, username: target.value })
          }
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          value={user.password}
          name="password"
          id="password"
          onChange={({ target }) =>
            setUser({ ...user, password: target.value })
          }
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
