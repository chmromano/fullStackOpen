import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
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

export const { setUserState, clearUserState } = userSlice.actions;

export default userSlice.reducer;
