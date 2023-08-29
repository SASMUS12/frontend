import { FC } from 'react';
import styles from './ActiveChat.module.scss';
import { useNavigate } from 'react-router-dom';

interface ActiveChatProps {
  isActive: boolean;
}

const ActiveChat: FC<ActiveChatProps> = ({ isActive }) => {
  const navigate = useNavigate();

  const handlePartnerSearchBtn = () => {
    navigate('/');
  };

  return (
    <div className={styles.chat}>
      {!isActive ? (
        <div className={styles.chat__greeting}>
          <p className={styles.chat__welcometext}>
            Выберите чат или отправляйтесь на
            <button
              className={styles.chat__searchbtn}
              onClick={handlePartnerSearchBtn}
              type='button'
            >
              поиск партнёра
            </button>
          </p>
          <div className={styles.chat__idleimg}></div>
        </div>
      ) : (
        <></> // TO DO: место для активного чата
      )}
    </div>
  );
};

export default ActiveChat;
