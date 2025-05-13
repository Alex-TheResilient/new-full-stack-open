import { createContext, useReducer, useContext } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'CLEAR':
      return '';
    default:
      return state;
  }
};

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, '');

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

// Helper para mostrar notificaciones temporales
export const setNotification = (dispatch, message, seconds = 5) => {
  dispatch({ type: 'SET', payload: message });

  setTimeout(() => {
    dispatch({ type: 'CLEAR' });
  }, seconds * 1000);
};
