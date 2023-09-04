import icon from '../../../../images/userProfile/edit.png';
import styles from './EditButton.module.scss';

const EditButton = () => {
  const handleButtonClick = () => {
    // Действия
  };

  return (
    <>
      <button className={styles.profile__button} onClick={handleButtonClick}>
        <img className={styles.profile__icon} src={icon} alt='редактировать' />
        <p className={styles.profile__text}>Редактировать профиль</p>
      </button>
    </>
  );
};

export default EditButton;
