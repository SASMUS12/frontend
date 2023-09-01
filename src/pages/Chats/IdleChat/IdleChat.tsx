import { useNavigate } from 'react-router-dom';
import styles from './IdleChat.module.scss';

const IdleChat = () => {
  const navigate = useNavigate();

  const handlePartnerSearchBtn = () => {
    navigate('/');
  };

  return (
    <div className={styles.chat}>
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
        <div className={styles.chat__img}></div>
      </div>
    </div>
  );
};

export default IdleChat;
