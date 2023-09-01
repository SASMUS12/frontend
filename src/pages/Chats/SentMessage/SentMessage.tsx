import { FC } from 'react';
import styles from './SentMessage.module.scss';

interface SentMessageProps {
  text: string;
  time: string;
}

const SentMessage: FC<SentMessageProps> = ({ text, time }) => {
  return (
    <div className={styles.message}>
      <p className={styles.message__text}>{text}</p>
      <p className={styles.message__time}>{time}</p>
    </div>
  );
};

export default SentMessage;
