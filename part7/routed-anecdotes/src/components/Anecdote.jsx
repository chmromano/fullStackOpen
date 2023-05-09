import React from "react";

const Anecdote = ({ anecdote }) => (
  <>
    <h2>
      {anecdote.content} by {anecdote.author}
    </h2>
    <p>
      Has {anecdote.votes} vote{anecdote.votes === 1 ? null : "s"}
    </p>
    <p>
      For more information visit{" "}
      <a href={anecdote.info} rel="noreferrer" target="_blank">
        {anecdote.info}
      </a>
    </p>
  </>
);

export default Anecdote;
