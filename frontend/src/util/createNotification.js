import { notification } from 'antd';

export default function createNotification(content) {
  const { message, description, duration } = content;

  notification.open({
    message,
    description,
    duration,
  });
}
