import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((a) => a.id === id);
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1;
      }
    },
  },
});

export const { setAnecdotes, appendAnecdote, voteAnecdote } =
  anecdoteSlice.actions;

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

export const voteForAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteId = getState().anecdotes.find((a) => a.id === id);
    const updatedAnecdote = { ...anecdoteId, votes: anecdoteId.votes + 1 };
    await anecdoteService.update(id, updatedAnecdote);
    dispatch(voteAnecdote(id));
  };
};

export default anecdoteSlice.reducer;
