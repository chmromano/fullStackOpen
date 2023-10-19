import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useApolloClient, useSubscription } from "@apollo/client";

import Notify from "./components/Notify";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Menu from "./components/Menu";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";

import { updateCacheOnNewBook } from "./graphql/updateCache";
import { BOOK_ADDED } from "./graphql/subscriptions";

const App = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const apolloClient = useApolloClient();

  useEffect(() => {
    const savedToken = localStorage.getItem("books-user-token");
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    apolloClient.resetStore();
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const newBook = data.data.bookAdded;
      window.alert(`${newBook.title} added`);
      updateCacheOnNewBook(apolloClient.cache, newBook);
    },
  });

  return (
    <>
      <Notify errorMessage={errorMessage} />

      <Menu logout={logout} token={token} />

      {loading ? null : (
        <Routes>
          <Route path="/" element={<Navigate to="/authors" />} />
          <Route
            path="/authors"
            element={<Authors setError={notify} token={token} />}
          />
          <Route path="/books" element={<Books />} />
          <Route
            path="/newbook"
            element={
              token ? <NewBook setError={notify} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/recommended"
            element={token ? <Recommended /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              !token ? (
                <LoginForm setToken={setToken} setError={notify} />
              ) : (
                <Navigate to="/authors" />
              )
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
