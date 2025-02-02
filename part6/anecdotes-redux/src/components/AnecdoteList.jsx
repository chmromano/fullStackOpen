import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((anecdote) => anecdote.content.includes(filter));
  });

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5000));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            {`- has ${anecdote.votes} vote${anecdote.votes === 1 ? "" : "s"} `}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
