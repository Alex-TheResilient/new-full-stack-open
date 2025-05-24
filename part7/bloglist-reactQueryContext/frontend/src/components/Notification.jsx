import { useNotification } from '../contexts/NotificationContext.jsx';

const Notification = () => {
  const { notification } = useNotification();
  const { message, type } = notification;

  if (!message) {
    return null;
  }

  const notificationClass = type === 'error' ? 'error' : 'success';

  return <div className={notificationClass}>{message}</div>;
};

export default Notification;
