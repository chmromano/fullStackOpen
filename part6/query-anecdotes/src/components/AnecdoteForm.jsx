import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../notificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const dispatch = useNotificationDispatch();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onSuccess: () => {
          dispatch({
            type: "SET",
            payload: `Anecdote "${content}" created`,
          });
          setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
        },
        onError: () => {
          dispatch({
            type: "SET",
            payload: `Anecdote must be at least 5 characters long`,
          });
          setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
        },
      }
    );
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
