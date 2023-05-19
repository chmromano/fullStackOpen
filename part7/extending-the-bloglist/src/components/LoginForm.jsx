import React from "react";
import useField from "../hooks/useField";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("text");

  const resetForm = () => {
    resetUsername();
    resetPassword();
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        password: password.value,
        username: username.value,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      dispatch(setUser(user));
      dispatch(
        setNotification({ error: false, text: "Successfully logged in" }, 5000)
      );
    } catch (error) {
      dispatch(
        setNotification({ error: true, text: "Something went wrong" }, 5000)
      );
    }

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

export default LoginForm;
