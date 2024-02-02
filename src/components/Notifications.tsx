import './Notifications.css';

type NotificationProps = {
  notifications: Array<{ message: string, style: string }>
};

// TODO: Refactor.
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
