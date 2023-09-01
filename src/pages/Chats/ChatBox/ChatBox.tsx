import { FC } from 'react';
import styles from './ChatBox.module.scss';
import SentMessage from '../SentMessage/SentMessage';
// import ReceivedMessage from '../ReceivedMessage/ReceivedMessage';

interface ChatBoxProps {
  sentMessages: string[];
}

const ChatBox: FC<ChatBoxProps> = ({ sentMessages }) => {
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedHoursWithZero =
      formattedHours < 10 ? `0${formattedHours}` : formattedHours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHoursWithZero}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div className={styles.chatbox}>
      {sentMessages.map((message, index) => (
        <SentMessage key={index} text={message} time={getCurrentTime()} />
      ))}
    </div>
  );
};

export default ChatBox;
