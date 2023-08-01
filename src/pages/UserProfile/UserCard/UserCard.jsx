import EditButton from '../Buttons/EditButton/EditButton';
import IconButton from '../Buttons/IconButton/IconButton';
import UserLanguages from '../UserLanguages/UserLanguages';
import Topics from '../Topics/Topics';
import About from '../About/About';
import Reviews from '../Reviews/Reviews';
import cardPartnerAvatar from '../../../images/userProfile/card-partner-avatar.png';
import cardPartnerFlag from '../../../images/userProfile/flag.png';
import styles from "./UserCard.module.scss";

const UserCard = () => {
  return(
    <div className={styles.profile__card}>
      <div className={styles.profile__main}>
        <div className={styles.profile__accent}></div>
        <div className={styles.profile__generalInfo}>
          <div className={styles.profile__partnerAbout}>
            <img className={styles.profile__partnerAvatar} src={cardPartnerAvatar} alt="Аватар пользователя"/>
            <div className={styles.profile__partnerInfo}>
              <div>
              <p className={styles.profile__name}>Светлана</p>
              <p className={styles.profile__sex}>женщина, 33</p>
              </div>
              <div className={styles.profile__country}>
              <img className={styles.profile__flag} src={cardPartnerFlag} alt="Флаг страны пользователя"/>
                <p className={styles.profile__city}>Россия, Москва</p>
              </div>
            </div>
          </div>
          <div className={styles.profile__buttons}>
            <EditButton />
            <IconButton />
          </div>
        </div>
      </div>
      <div className={styles.profile__moreAbout}>
        <div>
          <UserLanguages />
          <Topics />
        </div>
        <div>
          <About />
        </div>
      </div>
      <Reviews />
    </div>
  );
};

export default UserCard;