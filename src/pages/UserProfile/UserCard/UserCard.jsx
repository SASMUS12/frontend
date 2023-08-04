import formattedTime from '../../../utils/getTime';
import cardPartnerAvatar from '../../../images/userProfile/card-partner-avatar.png';
import cardPartnerFlag from '../../../images/userProfile/russia.svg';
import clock from '../../../images/userProfile/clock.png';

import styles from "./UserCard.module.scss";

const UserCard = ({ isEditing, name, age, gender, location, setName, setAge, setGender, setLocation }) => {

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleChangeAge = (event) => {
    const birthDate = new Date(event.target.value);
    const calculatedAge = calculateAge(birthDate);
    setAge(calculatedAge);
  }

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }

  const calculateAge = (birthdate) => {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    return age;
  };

  return(
    <>
    {!isEditing ? (
      <div className={styles.profile__main}>
        <div className={styles.profile__accent}></div>
        <div className={styles.profile__generalInfo}>
          <div className={styles.profile__partnerAbout}>
            <img className={styles.profile__partnerAvatar} src={cardPartnerAvatar} alt="Аватар пользователя"/>
            <div className={styles.profile__partnerInfo}>
              <div>
              <p className={styles.profile__name}>{name}</p>
              <p className={styles.profile__sex}>{gender}, {age}</p>
              </div>
              <div>
                <div className={styles.profile__country}>
                <img className={styles.profile__flag} src={cardPartnerFlag} alt="Флаг страны пользователя"/>
                  <p className={styles.profile__city}>{location}</p>
                </div>
                <div className={styles.profile__time}>
                  <p className={styles.profile__current}>Сейчас</p>
                  <img className={styles.profile__clock} src={clock} alt='изображение часов с циферблатом' />
                  <p className={styles.profile__formattedTime}>{formattedTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ):(
      <div className={styles.profile__main}>
        <div className={styles.profile__accent}></div>
        <div className={styles.profile__generalInfo}>
          <div className={styles.profile__partnerAbout}>
            <img className={styles.profile__partnerAvatar} src={cardPartnerAvatar} alt="Аватар пользователя"/>
            <div className={styles.profile__partnerInfo}>
              <form className={styles.profile__form}>
                <div>
                  <div className={styles.profile__flexColumn}>
                    <label htmlFor='partnerName'>Имя</label>
                    <input 
                      type='text' 
                      id='partnerName' 
                      name='partnerName' 
                      className={styles.profile__input}
                      value={name}
                      onChange={handleNameChange}
                      />
                  </div>
                  <div className={styles.profile__flexColumn}>
                    <label htmlFor='partnerBirthday' className={styles.profile__labelForBirthday}>Дата рождения</label>
                    <input 
                      type='date' 
                      id='partnerBirthday' 
                      name='partnerBirthday' 
                      className={styles.profile__input} 
                      onChange={handleChangeAge}/>
                  </div>      
                </div>
                <div>
                  <div className={styles.profile__flexColumn}>
                    <label htmlFor='partnerGender'>Пол</label>
                    <div>
                      <input
                        type="button"
                        value="мужчина"
                        name='partnerGender'
                        id='male'
                        className={gender === 'мужчина' ? styles.selected : styles.profile__gender}
                        onClick={() => setGender('мужчина')}
                      />
                      <input
                        type="button"
                        value="женщина"
                        name='partnerGender'
                        id='female'
                        className={gender === 'женщина' ? styles.selected : styles.profile__gender}
                        onClick={() => setGender('женщина')}
                      />
                      <input
                        type="button"
                        value="не указан"
                        name='partnerGender'
                        id='unspecified'
                        className={gender === 'не указан' ? styles.selected : styles.profile__gender}
                        onClick={() => setGender('не указан')}
                      />
                    </div>
                  </div>
                  <div className={styles.profile__flexColumn}>
                    <label className={styles.profile__labelForLocation} htmlFor='partnerLocation'>Местоположение</label>
                    <input 
                      type='text' 
                      id='partnerLocation' 
                      name='partnerLocation' 
                      className={styles.profile__input}
                      value={location}
                      onChange={handleLocationChange}
                      />
                  </div>                
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default UserCard;