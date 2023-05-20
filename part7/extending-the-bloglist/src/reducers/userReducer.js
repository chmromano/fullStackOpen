import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsersState(state, action) {
      return action.payload.sort();
    },
    clearUsersState() {
      return [];
    },
  },
});

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsersState(users));
  };
};

export const clearUsers = () => {
  return (dispatch) => {
    dispatch(clearUsersState());
  };
};

export const { setUsersState, clearUsersState } = userSlice.actions;

export default userSlice.reducer;
