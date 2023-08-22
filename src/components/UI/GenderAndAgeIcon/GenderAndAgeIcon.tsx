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

const GenderAndAgeIcon: FC<GenderAndAgeIconProps> = ({
  gender,
  age,
  gender_is_hidden,
}) => {
  const isGenderVisible = gender && !gender_is_hidden;
  const genderIcon = gender === 'Female' ? femaleGender : maleGender;

  return (
    <div
      className={cn(styles.card__partnerPersonalInfo_genderAndAge, {
        [styles.card__partnerPersonalInfo_genderAndAge_hidden]: !gender || !age,
      })}
    >
      {isGenderVisible && (
        <img
          className={cn(styles.card__partnerPersonalInfo_partnerGender, {
            [styles.card__partnerPersonalInfo_partnerGender_hidden]:
              gender_is_hidden,
          })}
          src={genderIcon}
          alt='Пол пользователя'
        />
      )}
      <p className={styles.card__partnerPersonalInfo_partnerAge}>{age}</p>
    </div>
  );
};

export default GenderAndAgeIcon;
