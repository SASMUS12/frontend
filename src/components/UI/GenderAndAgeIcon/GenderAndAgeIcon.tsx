import React, { FC } from 'react';
import cn from 'classnames';
import femaleGender from '../../../images/svg/card-gender-female.svg';
import maleGender from '../../../images/svg/card-gender-male.svg';

import styles from './GenderAndAgeIcon.module.scss';

interface GenderAndAgeIconProps {
  gender: string | undefined;
  age: string | undefined;
  gender_is_hidden?: boolean;
}

const GenderAndAgeIcon: FC<GenderAndAgeIconProps> = ({ gender, age, gender_is_hidden }) => {
  const getGender = () => {
    if (!gender_is_hidden) {
      if (gender) {
        return gender === 'Female' ? femaleGender : maleGender;
      } else {
        return 'styles.card__partnerPersonalInfo_partnerGender_hidden';
      }
    } else {
      return '#';
    }
  };

  const cardPartnerGenderClassName = `${
    gender
      ? !gender_is_hidden
        ? ''
        : styles.card__partnerPersonalInfo_partnerGender_hidden
      : styles.card__partnerPersonalInfo_partnerGender_hidden
  }`;

  return (
    <div
      className={
        gender && age
          ? styles.card__partnerPersonalInfo_genderAndAge
          : styles.card__partnerPersonalInfo_genderAndAge_hidden
      }>
      <img
        className={cn(styles.card__partnerPersonalInfo_partnerGender, cardPartnerGenderClassName)}
        src={getGender()}
        alt="Пол пользователя"
      />
      <p className={styles.card__partnerPersonalInfo_partnerAge}>{age}</p>
    </div>
  );
};

export default GenderAndAgeIcon;
