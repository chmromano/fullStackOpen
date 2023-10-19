import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import useField from "../hooks/useField";

import { updateCacheOnNewBook } from "../graphql/updateCache";
import { ADD_BOOK } from "../graphql/mutations";

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
      updateCacheOnNewBook(cache, newBook);
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
