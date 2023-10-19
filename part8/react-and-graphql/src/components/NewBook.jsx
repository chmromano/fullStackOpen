import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import useField from "../hooks/useField";

import { ADD_BOOK } from "../graphql/mutations";
import { ALL_AUTHORS, ALL_BOOKS } from "../graphql/queries";

const NewBook = ({ setError }) => {
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetPublished, ...published } = useField("number");
  const { reset: resetGenre, ...genre } = useField("text");

  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(messages);
    },
    update: (cache, response) => {
      const newBook = response.data.addBook;

      const updateCacheForQuery = (query, key, newValue) => {
        cache.updateQuery(query, (data) => {
          console.log("From NewBook.jsx", key, data);

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

  const resetForm = () => {
    resetTitle();
    resetAuthor();
    resetPublished();
    resetGenre();

    setGenres([]);
  };

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: {
        title: title.value,
        author: author.value,
        published: Number(published.value),
        genres,
      },
    });

    resetForm();
  };

  const addGenre = () => {
    setGenres(genres.concat(genre.value));
    resetGenre();
  };

  return (
    <>
      <form onSubmit={submit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          published
          <input {...published} />
        </div>
        <div>
          <input {...genre} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </>
  );
};

export default NewBook;
