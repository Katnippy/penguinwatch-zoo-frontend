import './Notification.css';

type NotificationProps = {
  notification: { message: string, style: string },
};

export default function Notification({ notification: { message, style } }: NotificationProps) {
  return (
    <div className={style}>
      <h2>{message}</h2>
    </div>
  );
}
