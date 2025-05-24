import { createSlice } from '@reduxjs/toolkit';

// Estado inicial de las notificaciones
const initialState = {
  message: null,
  type: null,
};

// Creamos el slice con el reducer y las acciones
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

// Exportamos las acciones
export const { showMessage, hideMessage } = notificationSlice.actions;

// Creamos un action creator que maneja el tiempo de visualización
export const setNotification = (message, type, seconds = 5) => {
  return async (dispatch) => {
    dispatch(showMessage({ message, type }));

    // Limpia cualquier temporizador existente
    if (window.notificationTimeout) {
      clearTimeout(window.notificationTimeout);
    }

    // Configura el temporizador para ocultar el mensaje
    window.notificationTimeout = setTimeout(() => {
      dispatch(hideMessage());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
