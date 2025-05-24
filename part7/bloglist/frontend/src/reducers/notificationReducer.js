import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  type: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showMessage(state, action) {
      const { message, type } = action.payload;
      return { message, type };
    },
    hideMessage() {
      return initialState;
    },
  },
});

export const { showMessage, hideMessage } = notificationSlice.actions;

export const setNotification = (message, type, seconds = 5) => {
  return async (dispatch) => {
    dispatch(showMessage({ message, type }));

    if (window.notificationTimeout) {
      clearTimeout(window.notificationTimeout);
    }

    window.notificationTimeout = setTimeout(() => {
      dispatch(hideMessage());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
