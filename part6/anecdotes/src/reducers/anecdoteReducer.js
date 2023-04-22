import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return [...state, { ...action.payload, votes: 0 }];
    },
    vote(state, action) {
      return state
        .map((anecdote) => {
          if (action.payload === anecdote.id) {
            return { ...anecdote, votes: anecdote.votes + 1 };
          }

          return anecdote;
        })
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      return [...state, action.payload];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, vote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
