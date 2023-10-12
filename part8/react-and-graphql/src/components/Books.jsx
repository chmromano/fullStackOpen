import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS } from "../graphql/queries";

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  if (result.loading) {
    return <>Loading books...</>;
  }

  const books = result.data.allBooks;

  const genres = [...new Set(books.flatMap((book) => book.genres))];

  return (
    <>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => setSelectedGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setSelectedGenre(null)}>All genres</button>
    </>
  );
};

export default Books;
