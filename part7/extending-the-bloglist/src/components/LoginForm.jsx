import React from "react";
import useField from "../hooks/useField";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/loginReducer";
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

      const notification = { error: false, text: "Successfully logged in" };
      dispatch(setNotification(notification, 5000));

      resetForm();
    } catch (error) {
      const notification = { error: true, text: "Something went wrong" };
      dispatch(setNotification(notification, 5000));
    }
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
