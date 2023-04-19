import React from "react";

import { useDispatch } from "react-redux";

import { createAnecdote } from "../reducers/anecdoteReducer";
import { setMessage, removeMessage } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(createAnecdote(content));

    dispatch(setMessage(`Anecdote "${content}" successfully added`));
    setTimeout(() => {
      dispatch(removeMessage());
    }, 5000);
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
