import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    set(state, action) {
      return action.payload;
    },
    clear(state, action) {
      return "";
    },
  },
});

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(set(message));
    setTimeout(() => {
      dispatch(clear());
    }, timeout);
  };
};

export const { set, clear } = notificationSlice.actions;

export default notificationSlice.reducer;
