import React, { FC } from "react";

import femaleGender from "../../../images/svg/card-gender-female.svg";
import maleGender from "../../../images/svg/card-gender-male.svg";

import { GenderEnum, NullEnum } from "../../../utils/openapi";

import styles from "./GenderAndAgeIcon.module.scss";
import cn from "classnames";

interface GenderAndAgeIconProps {
  gender: GenderEnum | NullEnum | null;
  age: string;
  gender_is_hidden?: boolean;
  age_is_hidden?: boolean;
}

const GenderAndAgeIcon: FC<GenderAndAgeIconProps> = ({
  gender,
  age,
  gender_is_hidden,
  age_is_hidden,
}) => {
  const isGenderVisible = gender && !gender_is_hidden;
  const isAgeVisible = age && !age_is_hidden;

  const genderIcon = gender === "Female" ? femaleGender : maleGender;

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
          alt="Пол пользователя"
        />
      )}
      {isAgeVisible && (
        <p className={styles.card__partnerPersonalInfo_partnerAge}>{age}</p>
      )}
    </div>
  );
};

export default GenderAndAgeIcon;
