import styles from './AllChats.module.css';
import ChatsMenu from '../ChatsMenu/ChatsMenu';

const ChatsList = () => {
  return (
    <div className={styles.allchats}>
      <ChatsMenu />
    </div>
  );
};

export default ChatsList;
