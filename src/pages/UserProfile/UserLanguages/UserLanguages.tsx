import LevelLanguage from '../LevelLanguage/LevelLanguage';
import help from '../../../images/userProfile/help.png';
import IconButton from '../Buttons/IconButton/IconButton';
import styles from './UserLanguages.module.scss';
import add from '../../../images/userProfile/plus.svg';

interface UserLanguagesProps {
  isEditing: boolean;
  userLanguages?: Language[]; // Update the type of languages accordingly
}

interface Language {
  isocode: string;
  skill_level: string;
}

const UserLanguages: React.FC<UserLanguagesProps> = ({
  isEditing,
  userLanguages,
}) => {
  const levelsArray = Array.from({ length: 6 });

  const handleAddLang = () => {
    // Action;
  };

  return (
    <>
      {!isEditing ? (
        <div className={styles.profile__languages}>
          <div>
            <h3 className={styles.profile__title}>Свободный</h3>
            {userLanguages?.length === 0 && (
              <div className={styles.profile__language}>
                <p className={styles.profile__subtitle}>Русский</p>
                <div className={styles.profile__levels}>
                  {levelsArray.map((_, index) => {
                    return <LevelLanguage key={index} />;
                  })}
                </div>
              </div>
            )}
          </div>
          <div>
            <h3 className={styles.profile__title}>Изучаю</h3>
            {userLanguages?.length === 0 && (
              <div className={styles.profile__language}>
                <p className={styles.profile__subtitle}>Английский</p>
                <div className={styles.profile__levels}>
                  {levelsArray.map((_, index) => {
                    return <LevelLanguage key={index} />;
                  })}
                </div>
              </div>
            )}
          </div>
          <img
            className={styles.profile__help}
            src={help}
            alt='Флаг страны пользователя'
          />
        </div>
      ) : (
        <div className={styles.profile__languages}>
          <div>
            <h3 className={styles.profile__title}>Свободный</h3>
            {userLanguages?.length === 0 && (
              <div className={styles.profile__language}>
                <p className={styles.profile__subtitle}>Русский</p>
                <div className={styles.profile__levels}>
                  {levelsArray.map((_, index) => {
                    return <LevelLanguage key={index} />;
                  })}
                </div>
              </div>
            )}
            <div className={styles.profile__level}>
              <IconButton
                icon={add}
                handleFunction={handleAddLang}
                iconWidth={10}
                iconHeight={10}
              />
              <p className={styles.profile__langAdd}>добавить язык</p>
            </div>
          </div>
          <div>
            <h3 className={styles.profile__title}>Изучаю</h3>
            {userLanguages?.length === 0 && (
              <div className={styles.profile__language}>
                <p className={styles.profile__subtitle}>Английский</p>
                <div className={styles.profile__levels}>
                  {levelsArray.map((_, index) => {
                    return <LevelLanguage key={index} />;
                  })}
                </div>
              </div>
            )}
            <div className={styles.profile__level}>
              <IconButton
                icon={add}
                handleFunction={handleAddLang}
                iconWidth={10}
                iconHeight={10}
              />
              <p className={styles.profile__langAdd}>добавить язык</p>
            </div>
          </div>
          <img
            className={styles.profile__help}
            src={help}
            alt='Флаг страны пользователя'
          />
        </div>
      )}
    </>
  );
};

export default UserLanguages;
