import type { Notification } from '@/types/User';
import { FaComment } from 'react-icons/fa';
import NotificationHeader from './NotificationHeader';

export default function postNotification({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <div className="start flex">
      <div className="text-accent-orange">
        <FaComment size={60} className="align-self-center" />
      </div>
      <div className="ml-5">
        <NotificationHeader notification={notification} />
        <div className="m-3">
          <p>{notification.context}</p>
        </div>
      </div>
    </div>
  );
}
