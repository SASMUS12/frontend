import styles from './ActiveChat.module.scss';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatBox from '../ChatBox/ChatBox';
import InputBox from '../InputBox/InputBox';

const ActiveChat = () => {
  return (
    <div className={styles.chat}>
      <ChatHeader />
      <ChatBox />
      <InputBox />
    </div>
  );
};

export default ActiveChat;
