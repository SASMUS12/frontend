import {FC} from "react";

import { LanguagesTag } from "./LanguagesTag";

import logInIndicator from "../../images/svg/card-indicator-logIn.svg";
import logOutIndicator from "../../images/svg/card-indicator-logOut.svg";
import avatarSquare from "../../images/svg/card-avatar-square.svg";
import femaleGender from "../../images/svg/card-gender-female.svg";
import maleGender from "../../images/svg/card-gender-male.svg";
import arrows from "../../images/svg/card-arrows-parallel.svg";

import styles from "./Card.module.scss";

interface IProps {
    country: string;
    flag: string;
    status: string;
    avatar?: string;
    first_name: string;
    gender: string;
    age?: string;
    about?: string;
    indicator: boolean;
    nativeLanguages?: any;
    foreignLanguages?: any;
}

export const Card: FC<IProps> = ({country, flag, avatar, status, first_name, gender, age, about, indicator, nativeLanguages, foreignLanguages}) => {
    const getGender = () => {
        return gender === "Female"
            ? femaleGender
            : maleGender
    }

    return (
        <article className={styles.card}>
            <div className={styles.card__countryAndStatusTag}>
                <div className={styles.card__tag}>
                    <img className={styles.card__flag} src={flag} alt="Флаг страны пользователя"/>
                    <p className={styles.card__text}>{country}</p>
                </div>
                <div className={styles.card__tag}>
                    <img
                        className={styles.card__indicator}
                        src={indicator
                            ? logInIndicator
                            : logOutIndicator
                        }
                        alt="Флаг страны пользователя"
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
                        <div className={styles.card__partnerPersonalInfo_genderAndAge}>
                            <img className={styles.card__partnerPersonalInfo_partnerGender} src={getGender()}
                                 alt="Пол пользователя"/>
                            <p className={styles.card__partnerPersonalInfo_partnerAge}>{age}</p>
                        </div>
                        <div className={styles.card__partnerPersonalInfo_languagesTag}>
                            <div className={styles.card__partnerPersonalInfo_languages}>
                                <ul className={styles.languages}>
                                    {nativeLanguages.map((languages: any) => (
                                        <LanguagesTag
                                            languages={languages}
                                        />
                                    ))}
                                </ul>
                            </div>
                            <img className={styles.card__partnerPersonalInfo_arrows} src={arrows}
                                 alt="Параллельные стрелки между изученными и изучаемыми языками"/>
                            <div className={styles.card__partnerPersonalInfo_languages}>
                                <ul className={styles.languages}>
                                    {foreignLanguages.map((languages: any) => (
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
