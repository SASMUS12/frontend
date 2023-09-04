import styles from './AllChats.module.scss';
import ChatsMenu from '../ChatsMenu/ChatsMenu';

const ChatsList = () => {
  return (
    <div className={styles.allchats}>
      <ChatsMenu />
    </div>
  );
};

export default ChatsList;
