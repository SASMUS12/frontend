import { useState } from 'react';
import styles from './ActiveChat.module.scss';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatBox from '../ChatBox/ChatBox';
import InputBox from '../InputBox/InputBox';
import chatSocket from '../utils/webSocket';

const ActiveChat = () => {
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  const sendMessage = (message: string) => {
    setSentMessages((prevSentMessages) => [...prevSentMessages, message]);
    chatSocket(message);
  };

  return (
    <div className={styles.chat}>
      <ChatHeader />
      <ChatBox sentMessages={sentMessages} />
      <InputBox sendMessage={sendMessage} />
    </div>
  );
};

export default ActiveChat;
