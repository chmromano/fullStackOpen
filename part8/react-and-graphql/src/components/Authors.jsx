import React from "react";
import { useQuery } from "@apollo/client";

import { ALL_AUTHORS } from "../graphql/queries";
import SetBirthYear from "./SetBirthYear";

const Authors = ({ setError, token }) => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <>Loading authors...</>;
  }

  const authors = result.data.allAuthors;

  return (
    <>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token ? <SetBirthYear authors={authors} setError={setError} /> : null}
    </>
  );
};

export default Authors;
