import styles from './IconButton.module.scss';

const IconButton = ({ icon, handleFunction }) => {
  return (
    <>
      <button className={styles.profile__button} onClick={handleFunction}>
        <img
          className={styles.profile__icon}
          src={icon}
          alt='иконка настроек профиля'
        />
      </button>
    </>
  );
};

export default IconButton;
