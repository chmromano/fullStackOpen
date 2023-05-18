import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotificationState(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(setNotificationState(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout);
  };
};

export const { setNotificationState, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
