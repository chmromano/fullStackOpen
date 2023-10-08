import React from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS } from "../graphql/queries";

const Books = () => {
  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <>Loading authors...</>;
  }

  const books = result.data.allBooks;

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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Books;
