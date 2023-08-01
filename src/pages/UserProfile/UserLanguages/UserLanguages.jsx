import help from "../../../images/userProfile/help.png";
import styles from "./UserLanguages.module.scss";


const UserLanguages = () => {
  return(
    <>
      <div className={styles.profile__languages}>
        <div>
          <h3 className={styles.profile__title}>Свободный</h3>
          <p className={styles.profile__subtitle}>Русский</p>
        </div>
        <div>
          <h3 className={styles.profile__title}>Изучаю</h3>
          <p className={styles.profile__subtitle}>Английский</p>
        </div>
        <img className={styles.profile__help} src={help} alt="Флаг страны пользователя"/>
      </div>
    </>
  )
}

export default UserLanguages;