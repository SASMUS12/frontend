import {FC, useEffect, useState} from "react";

import {LanguagesTag} from "./LanguagesTag";

import logInIndicator from "../../images/svg/card-indicator-logIn.svg";
import logOutIndicator from "../../images/svg/card-indicator-logOut.svg";
import avatarSquare from "../../images/svg/card-avatar-square.svg";
import femaleGender from "../../images/svg/card-gender-female.svg";
import maleGender from "../../images/svg/card-gender-male.svg";
import arrows from "../../images/svg/card-arrows-parallel.svg";
import noFlag from "../../images/svg/russia.svg"

import styles from "./Card.module.scss";
import cn from "classnames";

interface IProps {
    country?: any;
    status: string;
    indicator: boolean;
    avatar?: string;
    first_name?: string;
    gender?: string;
    gender_is_hidden: boolean;
    age?: string;
    about?: string;
    nativeLanguages?: any;
    foreignLanguages?: any;
}

export const Card: FC<IProps> = ({
                                     country,
                                     avatar,
                                     status,
                                     first_name,
                                     gender,
                                     gender_is_hidden,
                                     age,
                                     about,
                                     indicator,
                                     nativeLanguages,
                                     foreignLanguages
                                 }) => {

    const getGender = () => {
        if (!gender_is_hidden) {
            if (gender) {
                return gender === "Female"
                    ? femaleGender
                    : maleGender
            } else {
                return "styles.card__partnerPersonalInfo_partnerGender_hidden";
            }
        } else {
            return "#"
        }
    }

    const cardPartnerGenderClassName = `${
        gender
            ? !gender_is_hidden
                ? ""
                : styles.card__partnerPersonalInfo_partnerGender_hidden
            : styles.card__partnerPersonalInfo_partnerGender_hidden
    }`;

    return (
        <article className={styles.card}>
            <div className={styles.card__countryAndStatusTag}>
                <div className={styles.card__tag}>
                    <img className={country ? styles.card__flag : styles.card__flag_hidden} src={country && country.flag_icon}
                         alt="Флаг страны пользователя"/>
                    <p className={styles.card__text}>{country && country.code}</p>
                </div>
                <div className={styles.card__tag}>
                    <img
                        className={styles.card__indicator}
                        src={indicator
                            ? logInIndicator
                            : logOutIndicator
                        }
                        alt="Индикатор статуса пользователя (в сети / не в сети)"
                    />
                    <p className={styles.card__text}>{status}</p>
                </div>
            </div>
            <div className={styles.card__partnerAbout}>
                <img
                    className={styles.card__partnerAvatar}
                    src={avatar
                        ? avatar
                        : avatarSquare
                    }
                    alt="Аватар пользователя"
                />
                <div className={styles.card__partnerInfo}>
                    <div className={styles.card__partnerPersonalInfo}>
                        <p className={styles.card__partnerPersonalInfo_firstName}>{first_name}</p>
                        <div className={gender && age ? styles.card__partnerPersonalInfo_genderAndAge : styles.card__partnerPersonalInfo_genderAndAge_hidden}>
                            <img
                                className={cn(styles.card__partnerPersonalInfo_partnerGender, cardPartnerGenderClassName)}
                                src={getGender()}
                                alt="Пол пользователя"
                            />
                            <p className={styles.card__partnerPersonalInfo_partnerAge}>{age}</p>
                        </div>
                        <div className={styles.card__partnerPersonalInfo_languagesTag}>
                            <div className={styles.card__partnerPersonalInfo_languages}>
                                <ul className={styles.languages}>
                                    {nativeLanguages && nativeLanguages.map((languages: any) => (
                                        <LanguagesTag
                                            languages={languages}
                                        />
                                    ))}
                                </ul>
                            </div>
                            <img
                                className={(nativeLanguages.length > 0 || foreignLanguages.length > 0) ? styles.card__partnerPersonalInfo_arrows : styles.card__partnerPersonalInfo_arrows_hidden}
                                src={arrows}
                                alt="Параллельные стрелки между изученными и изучаемыми языками"/>
                            <div className={styles.card__partnerPersonalInfo_languages}>
                                <ul className={styles.languages}>
                                    {foreignLanguages && foreignLanguages.map((languages: any) => (
                                        <LanguagesTag
                                            languages={languages}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className={styles.card__partnerGreeting}>{about}</p>
        </article>
    );
}
