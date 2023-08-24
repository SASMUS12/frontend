import { useState } from 'react';
import IconButton from '../Buttons/IconButton/IconButton';
import formattedTime from '../../../utils/getTime';
import cardPartnerAvatar from '../../../images/userProfile/card-partner-avatar.png';
import cardPartnerFlag from '../../../images/userProfile/russia.svg';
import clock from '../../../images/userProfile/clock.png';
import camera from '../../../images/userProfile/camera.svg';

import styles from "./UserCard.module.scss";

const UserCard = ({ isEditing, name, age, gender, location, setName, setAge, setGender, setLocation, avatar, setImageBase64 }) => {

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        setImageBase64(base64Data); // Сохраняем закодированное изображение
      };
      reader.readAsDataURL(file);
    }
  };
  
  
  const handleChange = (setState) => (event) => {
    setState(event.target.value); 
  }

  const handleClickAvatar = () => {
    // Action
  }

  const handleChangeAge = (event) => {
    setAge(event.target.value);
    const birthDate = new Date(event.target.value);
    const calculatedAge = calculateAge(birthDate);
    return calculatedAge;
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
                {location !== null && (
                  <div className={styles.profile__country}>
                  <img className={styles.profile__flag} src={cardPartnerFlag} alt="Флаг страны пользователя"/>
                    <p className={styles.profile__city}>{location}</p>
                  </div>
                )}
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
            <div className={styles.profile__onlyAvatar}>
            <img className={styles.profile__partnerAvatar} src={cardPartnerAvatar} alt="Аватар пользователя"/>
            <div className={styles.profile__partnerAvatarButton}>
              <IconButton icon={camera} handleFunction={handleClickAvatar} iconWidth={54} iconHeight={54} />
            </div>
            <div className={styles.profile__additionalButtons}>
              <input type='file' class="button1" onChange={handleFileInputChange} />Button 1
              <button class="button2">Button 2</button>
            </div>
            </div>
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
                      onChange={handleChange(setName)}
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
                        className={gender === 'Male' ? styles.selected : styles.profile__gender}
                        onClick={() => setGender('Male')}
                      />
                      <input
                        type="button"
                        value="женщина"
                        name='partnerGender'
                        id='female'
                        className={gender === 'Female' ? styles.selected : styles.profile__gender}
                        onClick={() => setGender('Female')}
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
                      onChange={handleChange(setLocation)}
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