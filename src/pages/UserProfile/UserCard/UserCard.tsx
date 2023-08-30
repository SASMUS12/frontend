import React, { FC, ChangeEvent } from "react";
import { GenderEnum } from "../../../utils/openapi";
import IconButton from "../Buttons/IconButton/IconButton";
import formattedTime from "../../../utils/getTime";
import cardPartnerAvatar from "../../../images/userProfile/card-partner-avatar.png";
import cardPartnerFlag from "../../../images/userProfile/russia.svg";
import clock from "../../../images/userProfile/clock.png";
import camera from "../../../images/userProfile/camera.svg";
import styles from "./UserCard.module.scss";

export interface Country {
  code: string | null;
  name: string;
  flag_icon: string;
}

interface UserCardProps {
  isEditing: boolean;
  name: string;
  age: string;
  gender: GenderEnum | null;
  location: Country | string | null;
  setName: (value: string) => void;
  setAge: (value: string) => void;
  setGender: (value: GenderEnum | null) => void;
  setLocation: (value: string) => void;
  avatar: string | null;
  handleFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UserCard: FC<UserCardProps> = ({
  isEditing,
  name,
  age,
  gender,
  location,
  setName,
  setAge,
  setGender,
  setLocation,
  avatar,
  handleFileInputChange,
}) => {
  const handleChangeString = (
    setState: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setState(value);
  };

  const handleClickAvatar = () => {
    // Action
  };

  const handleChangeAge = (event: ChangeEvent<HTMLInputElement>) => {
    const birthDay = event.target.value;
    setAge(birthDay);
    const birthDate = new Date(event.target.value);
    const calculatedAge = calculateAge(birthDate);
    return calculatedAge;
  };

  const calculateAge = (birthdate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthdate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <>
      {!isEditing ? (
        <div className={styles.profile__main}>
          <div className={styles.profile__accent}></div>
          <div className={styles.profile__generalInfo}>
            <div className={styles.profile__partnerAbout}>
              <img
                className={styles.profile__partnerAvatar}
                src={avatar ? avatar : cardPartnerAvatar}
                alt="Аватар пользователя"
              />
              <div className={styles.profile__partnerInfo}>
                <div>
                  <p className={styles.profile__name}>{name}</p>
                  <p className={styles.profile__sex}>
                    {gender}, {age}
                  </p>
                </div>
                <div>
                  <div className={styles.profile__country}>
                    {location && typeof location === "object" ? (
                      <>
                        <img
                          className={styles.profile__flag}
                          src={cardPartnerFlag}
                          alt="Флаг страны пользователя"
                        />
                        <p className={styles.profile__city}>{location.code}</p>
                      </>
                    ) : (
                      <p className={styles.profile__city}>{location}</p>
                    )}
                  </div>
                  <div className={styles.profile__time}>
                    <p className={styles.profile__current}>Сейчас</p>
                    <img
                      className={styles.profile__clock}
                      src={clock}
                      alt="изображение часов с циферблатом"
                    />
                    <p className={styles.profile__formattedTime}>
                      {formattedTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.profile__main}>
          <div className={styles.profile__accent}></div>
          <div className={styles.profile__generalInfo}>
            <div className={styles.profile__partnerAbout}>
              <div className={styles.profile__onlyAvatar}>
                <img
                  className={styles.profile__partnerAvatar}
                  src={avatar ? avatar : cardPartnerAvatar}
                  alt="Аватар пользователя"
                />
                <div className={styles.profile__partnerAvatarButton}>
                  <IconButton
                    icon={camera}
                    handleFunction={handleClickAvatar}
                    iconWidth={54}
                    iconHeight={54}
                  />
                </div>
                <div className={styles.profile__additionalButtons}>
                  <input
                    type="file"
                    className="button1"
                    onChange={handleFileInputChange}
                  />
                  Button 1<button className="button2">Button 2</button>
                </div>
              </div>
              <div className={styles.profile__partnerInfo}>
                <form className={styles.profile__form}>
                  <div>
                    <div className={styles.profile__flexColumn}>
                      <label htmlFor="partnerName">Имя</label>
                      <input
                        type="text"
                        id="partnerName"
                        name="partnerName"
                        className={styles.profile__input}
                        value={name}
                        onChange={(event) =>
                          handleChangeString(
                            setName as React.Dispatch<
                              React.SetStateAction<string>
                            >,
                            event.target.value
                          )
                        }
                      />
                    </div>
                    <div className={styles.profile__flexColumn}>
                      <label
                        htmlFor="partnerBirthday"
                        className={styles.profile__labelForBirthday}
                      >
                        Дата рождения
                      </label>
                      <input
                        type="date"
                        id="partnerBirthday"
                        name="partnerBirthday"
                        className={styles.profile__input}
                        onChange={handleChangeAge}
                      />
                    </div>
                  </div>
                  <div>
                    <div className={styles.profile__flexColumn}>
                      <label htmlFor="partnerGender">Пол</label>
                      <div>
                        <input
                          type="button"
                          value="мужчина"
                          name="partnerGender"
                          id="male"
                          className={
                            gender === "Male"
                              ? styles.selected
                              : styles.profile__gender
                          }
                          onClick={() => setGender(GenderEnum.Male)}
                        />
                        <input
                          type="button"
                          value="женщина"
                          name="partnerGender"
                          id="female"
                          className={
                            gender === "Female"
                              ? styles.selected
                              : styles.profile__gender
                          }
                          onClick={() => setGender(GenderEnum.Female)}
                        />
                        <input
                          type="button"
                          value="не указан"
                          name="partnerGender"
                          id="unspecified"
                          className={
                            gender === null
                              ? styles.selected
                              : styles.profile__gender
                          }
                          onClick={() => setGender(null)}
                        />
                      </div>
                    </div>
                    <div className={styles.profile__flexColumn}>
                      <label
                        className={styles.profile__labelForLocation}
                        htmlFor="partnerLocation"
                      >
                        Местоположение
                      </label>
                      <input
                        type="text"
                        id="partnerLocation"
                        name="partnerLocation"
                        className={styles.profile__input}
                        onChange={(event) =>
                          handleChangeString(
                            setLocation as React.Dispatch<
                              React.SetStateAction<string>
                            >,
                            event.target.value
                          )
                        }
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
