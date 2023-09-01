import React, { FC, ChangeEvent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { GenderEnum } from "../../../utils/openapi";
import { useModel } from "./model";
import { Input } from "../../../components/UI/Input/Input";
import { Button } from "../../../components/UI/Button/Button";
import CountrySelection from "../../../components/CountrySelection/CountrySelection";
import Gender from "../../../components/Gender/Gender";
import Modal from "../../../components/Modal/Modal";
import Avatars from "../../../components/Avatars/Avatars";

import formattedTime from "../../../utils/getTime";

import cardPartnerAvatar from "../../../images/userProfile/card-partner-avatar.png";
import cardPartnerFlag from "../../../images/userProfile/russia.svg";
import clock from "../../../images/userProfile/clock.png";
import faceInACircle from "../../../images/face-in-a-circle.png";
import avatarPlace from "../../../images/fill-out-profile-export-avatar.png";

import styles from "./UserCard.module.scss";
import cn from "classnames";

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
  const model = useModel();

  useEffect(() => {
    model.handleCurrentUser();
  }, []);

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
                  <p className={styles.profile__name}>{model.username}</p>
                  <p className={styles.profile__sex}>
                    {model.gender} {model.age}
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
                <div className={styles.container__fillOutProfileArea}>
                  <div
                    className={
                      styles.container__fillOutProfileArea_exportAvatar
                    }
                  >
                    <div
                      className={
                        styles.container__fillOutProfileArea_exportAvatar_image
                      }
                    >
                      <img
                        src={model.avatar !== "" ? model.avatar : avatarPlace}
                        alt="Аватар пользователя"
                      />
                    </div>
                    <div
                      className={
                        styles.container__fillOutProfileArea_exportAvatar_popup
                      }
                    >
                      <button
                        type="button"
                        onClick={() => model.handleAvatarSelection("Загрузить")}
                      >
                        Загрузить фотографию
                      </button>
                      <button
                        type="button"
                        onClick={() => model.handleAvatarSelection("Создать")}
                      >
                        Создать аватар
                      </button>
                    </div>
                  </div>
                </div>
                {/* <img
                  className={styles.profile__partnerAvatar}
                  src={avatar ? avatar : cardPartnerAvatar}
                  alt="Аватар пользователя"
                /> */}
                {/* <div className={styles.profile__partnerAvatarButton}>
                  <IconButton
                    icon={camera}
                    handleFunction={handleClickAvatar}
                    iconWidth={54}
                    iconHeight={54}
                  />
                </div> */}
                {/* <div className={styles.profile__additionalButtons}>
                  <input
                    type="file"
                    className="button1"
                    onChange={handleFileInputChange}
                  />
                  Button 1<button className="button2">Button 2</button>
                </div> */}
              </div>
              <div className={styles.profile__partnerInfo}>
                <form className={styles.profile__form}>
                  <div>
                    <div className={styles.profile__flexColumn}>
                      <label htmlFor="partnerName">Имя</label>
                      <Input
                        className={cn(
                          styles.container__fillOutProfileArea_input,
                          styles.container__fillOutProfileArea_input_name
                        )}
                        type="text"
                        name="firstName"
                        value={model.username}
                        fontSize="16"
                        labelStyles="label18"
                        isLabelHintHidden={true}
                        placeholder="Имя"
                        error={model.error.firstName}
                        required
                        maxLength={12}
                        onValue={model.handleValue}
                      />
                    </div>
                    <div className={styles.profile__flexColumn}>
                      <label
                        htmlFor="partnerBirthday"
                        className={styles.profile__labelForBirthday}
                      >
                        Дата рождения
                      </label>
                      <Input
                        className={styles.container__fillOutProfileArea_input}
                        type="date"
                        name="birthdate"
                        value={model.birthdate}
                        fontSize="16"
                        labelStyles="label18"
                        isLabelHintHidden={true}
                        required
                        error={model.error.birthdate}
                        onValue={model.handleValue}
                      />
                    </div>
                  </div>
                  <div>
                    <div className={styles.profile__flexColumn}>
                      <label htmlFor="partnerGender">Пол</label>
                      <Gender
                        selectedGender={model.gender}
                        setSelectedGender={model.handleGenderValue}
                        componentName="fillOutProfile"
                      />
                    </div>
                    <div className={styles.profile__flexColumn}>
                      <label
                        className={styles.profile__labelForLocation}
                        htmlFor="partnerLocation"
                      >
                        Местоположение
                      </label>
                      <CountrySelection
                        pageName="FillOutProfile2"
                        selectedCountries={model.countries}
                        setSelectedCountries={model.handleCountriesValue}
                      />
                    </div>
                  </div>
                </form>

                <Modal
                  className={styles.modal}
                  isOpen={model.isExportAvatarModal}
                  onClose={model.handleModalClose}
                >
                  <img
                    className={styles.modal__image}
                    src={faceInACircle}
                    alt="Женское лицо в круге"
                  />
                  <h1
                    className={cn(styles.container__title, styles.modal__title)}
                  >
                    Загрузка фотографии
                  </h1>
                  <p className={styles.modal__text}>
                    Партнёрам будет приятнее вести диалог,
                    если&nbsp;Вы&nbsp;загрузите свою настоящую фотографию.
                    Пожалуйста, используйте форматы JPG и PNG. Размер&nbsp;файла
                    не должен превышать 10 Мб.
                  </p>
                  <Button
                    className={cn(
                      styles.modal__button,
                      styles.modal__button_primary
                    )}
                    type="button"
                    variant="primary"
                    disabled={model.isLoading}
                  >
                    {model.isLoading ? (
                      "Loading"
                    ) : (
                      <label htmlFor="file">Выбрать файл</label>
                    )}
                  </Button>
                  <input
                    className={styles.modal__input_file}
                    id="file"
                    type="file"
                    name="avatar"
                    onChange={(event) => model.handleSetAvatarPhoto(event)}
                  />
                </Modal>

                <Modal
                  className={styles.modal}
                  isOpen={model.isCreateAvatarModal}
                  onClose={model.handleModalClose}
                >
                  <h1
                    className={cn(styles.container__title, styles.modal__title)}
                  >
                    Выберите свой аватар
                  </h1>
                  <Avatars
                    selectedAvatar={model.previewAvatar}
                    setSelectedAvatar={model.handleSetAvatarValue}
                  />
                  <Button
                    className={cn(
                      styles.modal__button,
                      styles.modal__button_primary
                    )}
                    type="button"
                    variant="primary"
                    disabled={model.isLoading}
                    onClick={model.handleSetAvatar}
                  >
                    {model.isLoading ? "Loading" : "Сохранить"}
                  </Button>
                  <button
                    className={cn(
                      styles.modal__button,
                      styles.modal__button_transparent
                    )}
                    onClick={model.handleModalClose}
                    type="button"
                  >
                    Отменить изменения
                  </button>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(UserCard);
