import { FC } from 'react';
import styles from './ReceivedMessage.module.scss';

interface ReceivedMessageProps {
  text: string;
}

const ReceivedMessage: FC<ReceivedMessageProps> = ({ text }) => {
  return (
    <div className={styles.message}>
      <p className={styles.message__text}>{text}</p>
    </div>
  );
};

export default ReceivedMessage;
