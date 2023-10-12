import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";

import useField from "../hooks/useField";

import { LOGIN } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setError, setToken }) => {
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");

  const navigate = useNavigate();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("phonenumbers-user-token", token);
      navigate("/authors");
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    await login({
      variables: { username: username.value, password: password.value },
    });

    resetPassword();
    resetUsername();
  };

  return (
    <>
      <form onSubmit={submit}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
