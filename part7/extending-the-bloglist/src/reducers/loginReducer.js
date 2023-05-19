import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const loginSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUserState(state, action) {
      return action.payload;
    },
    clearUserState() {
      return null;
    },
  },
});

export const initialiseUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUserState(user));
      blogService.setToken(user.token);
    }
  };
};

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(setUserState(user));
  };
};

export const clearUser = (user) => {
  return async (dispatch) => {
    dispatch(clearUserState(user));
  };
};

export const { setUserState, clearUserState } = loginSlice.actions;

export default loginSlice.reducer;
