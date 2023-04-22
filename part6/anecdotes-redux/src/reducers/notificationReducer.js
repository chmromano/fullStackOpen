import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    clearMessage(state, action) {
      return "";
    },
  },
});

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(clearMessage());
    }, timeout);
  };
};

export const { setMessage, clearMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
