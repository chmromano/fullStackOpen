import React from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useNotificationDispatch } from "./notificationContext";

const App = () => {
  const queryClient = useQueryClient();

  const result = useQuery("anecdotes", getAnecdotes);

  const anecdotes = result.data;

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const dispatch = useNotificationDispatch();

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(
      { ...anecdote, votes: anecdote.votes + 1 },
      {
        onSuccess: () => {
          dispatch({
            type: "SET",
            payload: `Anecdote "${anecdote.content}" voted`,
          });
          setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
        },
        onError: () => {
          dispatch({
            type: "SET",
            payload: `Something went wrong`,
          });
          setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
        },
      }
    );
  };

  if (result.isError) {
    return <div>There was a problem communicating with the server.</div>;
  }

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;
