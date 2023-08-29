import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import GoBackButton from '../../components/UI/GoBackButton/GoBackButton';
import AllChats from './AllChats/AllChats';
import ActiveChat from './ActiveChat/ActiveChat';
import styles from './Chats.module.scss';

const Chats = () => {
  const navigate = useNavigate();

  // возврат на главную (для кнопки-стрелки)
  const handleBackButtonClick = () => {
    navigate('/');
  };

  return (
    <>
      <Header />
      <section className={styles.chats}>
        <GoBackButton
          onClick={handleBackButtonClick}
          positionClassName={styles.chats__backbtn}
        />
        <AllChats />
        <ActiveChat isActive={false} />
      </section>
      <Footer />
    </>
  );
};

export default Chats;
