import React from "react";
import PropTypes from "prop-types";
import useField from "../hooks/useField";

const LoginForm = ({ onLogin }) => {
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("text");

  const resetForm = () => {
    resetUsername();
    resetPassword();
  };

  const handleLogin = (event) => {
    event.preventDefault();

    onLogin({ password: password.value, username: username.value });

    resetForm();
  };

  const handleReset = (event) => {
    event.preventDefault();
    resetForm();
  };

  return (
    <>
      <h2>Log in to the application</h2>
      <form onSubmit={handleLogin}>
        Username:
        <br />
        <input {...username} />
        <br />
        Password:
        <br />
        <input {...password} />
        <br />
        <button type="submit">Login</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
