import LevelLanguage from "../LevelLanguage/LevelLanguage";
import help from "../../../images/userProfile/help.png";
import styles from "./UserLanguages.module.scss";


const UserLanguages = () => {

  const levelsArray = Array.from({ length: 6 });

  return(
    <>
      <div className={styles.profile__languages}>
        <div>
          <h3 className={styles.profile__title}>Свободный</h3>
          <div className={styles.profile__language}>
            <p className={styles.profile__subtitle}>Русский</p>
            <div className={styles.profile__levels}>
              {levelsArray.map((_, index) => {
                return <LevelLanguage key={index} />;
              })}
            </div>
          </div>
        </div>
        <div>
          <h3 className={styles.profile__title}>Изучаю</h3>
          <div className={styles.profile__language}>
            <p className={styles.profile__subtitle}>Английский</p>
            <div className={styles.profile__levels}>
              {levelsArray.map((_, index) => {
                return <LevelLanguage key={index} />;
              })}
            </div>
          </div>
        </div>
        <img className={styles.profile__help} src={help} alt="Флаг страны пользователя"/>
      </div>
    </>
  )
}

export default UserLanguages;