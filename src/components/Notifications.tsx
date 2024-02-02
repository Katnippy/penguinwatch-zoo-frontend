import './Notifications.css';

type NotificationProps = {
  notifications: Array<{ message: string, style: string }>
};

export default function Notifications({ notifications }: NotificationProps) {
  return (
    <>
      {notifications.map(({ message, style }) => (
        <div key={message} className={style}>
          <p>{message}</p>
        </div>
      ))}
    </>
  );
}
