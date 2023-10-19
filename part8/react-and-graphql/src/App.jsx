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

import { BOOK_ADDED } from "./graphql/subscriptions";
import { ALL_AUTHORS, ALL_BOOKS } from "./graphql/queries";

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
      notify(`${newBook.title} added`);

      const updateCacheForQuery = (query, key, newValue) => {
        apolloClient.cache.updateQuery(query, (data) => {
          console.log("From App.jsx", data);

          if (data === null || data[key].some((k) => k.id === newValue.id)) {
            return data;
          }

          return { ...data, [key]: data[key].concat(newValue) };
        });
      };

      updateCacheForQuery({ query: ALL_BOOKS }, "allBooks", newBook);
      updateCacheForQuery({ query: ALL_AUTHORS }, "allAuthors", newBook.author);

      newBook.genres.forEach((g) => {
        updateCacheForQuery(
          { query: ALL_BOOKS, variables: { genre: g } },
          "allBooks",
          newBook
        );
      });
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
