import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return [...state, { ...action.payload, votes: 0 }];
    },
    vote(state, action) {
      const anecdotes = state
        .map((anecdote) =>
          action.payload === anecdote.id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
        )
        .sort((a, b) => b.votes - a.votes);

      return anecdotes;
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes);
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedFields = { votes: anecdote.votes + 1 };
    await anecdoteService.update(anecdote.id, updatedFields);
    dispatch(vote(anecdote.id));
  };
};

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
