import icon from '../../../../images/userProfile/settings.png';
import styles from "./IconButton.module.scss";

const IconButton = () => {
  
  const handleButtonClick = () => {
    // Действия
  };

  return(
    <>
      <button className={styles.profile__button} onClick={handleButtonClick}>
        <img className={styles.profile__icon} src={icon} alt="перейти в настройки"/>
      </button>
    </>
  )
}

export default IconButton;