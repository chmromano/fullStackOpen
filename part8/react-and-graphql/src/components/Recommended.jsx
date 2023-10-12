import React from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS, ME } from "../graphql/queries";

const Recommended = () => {
  const userResult = useQuery(ME);
  const booksResult = useQuery(ALL_BOOKS, {
    skip: !userResult.data,
    variables: {
      genre: userResult.data?.me.favoriteGenre,
    },
  });

  if (userResult.loading || booksResult.loading) {
    return <>Loading books...</>;
  }

  const books = booksResult.data.allBooks;

  return (
    <>
      <h2>Recommendations</h2>

      <p>
        Books in your favorite genre <b>{userResult.data?.me.favoriteGenre}</b>
      </p>

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
    </>
  );
};

export default Recommended;
