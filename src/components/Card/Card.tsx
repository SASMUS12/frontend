import {FC} from 'react';

import LanguagesTag from '../UI/LanguagesTag/LanguagesTag';

import {сardRandomMaleAvatar, сardRandomFemaleAvatar} from "./CardRandomAvatar";
import arrows from '../../images/svg/card-arrows-parallel.svg';

import CountryIcon from '../UI/CountryIcon/CountryIcon';
import UserStatusIsOnline from '../UI/UserStatusIsOnline/UserStatusIsOnline';
import GenderAndAgeIcon from '../UI/GenderAndAgeIcon/GenderAndAgeIcon';
import {Country, UserNativeLanguage, UserForeignLanguage} from '../../utils/openapi';

import styles from './Card.module.scss';
import cn from "classnames";


interface ICards {
    country?: Country | null;
    is_online: boolean;
    avatar?: string;
    first_name?: string;
    gender?: string;
    gender_is_hidden: boolean;
    age?: string;
    age_is_hidden?: boolean;
    about?: string;
    languages?: any;
}

const Card: FC<ICards> = ({
                              country = null,
                              avatar,
                              first_name,
                              gender,
                              gender_is_hidden,
                              age,
                              age_is_hidden,
                              about,
                              is_online,
                              languages,
                          }) => {

    const getUserAvatar = () => {
        return avatar
            ? avatar
            : gender === "Male"
                ? сardRandomMaleAvatar()
                : сardRandomFemaleAvatar()
    };

    return (
        <article className={cn(styles.card)}>
            <div className={styles.card__countryAndStatusTag}>
                <CountryIcon country={country}/>
                <UserStatusIsOnline is_online={is_online}/>
            </div>
            <div className={styles.card__partnerAbout}>
                <img
                    className={styles.card__partnerAvatar}
                    src={`${getUserAvatar()}`}
                    alt="Аватар пользователя"
                />
                <div className={styles.card__partnerInfo}>
                    <div className={styles.card__partnerPersonalInfo}>
                        <p className={styles.card__partnerPersonalInfo_firstName}>{first_name}</p>
                        <GenderAndAgeIcon gender={gender} age={age} gender_is_hidden={gender_is_hidden}
                                          age_is_hidden={age_is_hidden}/>
                        <div className={styles.card__partnerPersonalInfo_languagesTag}>
                            <div className={styles.card__partnerPersonalInfo_languages}>
                                <ul className={styles.languages}>
                                    {languages &&
                                        languages.map((languages: UserForeignLanguage) => {
                                            return (languages.skill_level === "Native" &&
                                                <LanguagesTag languages={languages} key={languages.isocode}/>
                                            );
                                        })}
                                </ul>
                            </div>
                            <img
                                className={styles.card__partnerPersonalInfo_arrows}
                                src={arrows}
                                alt="Параллельные стрелки между изученными и изучаемыми языками"
                            />
                            <div className={styles.card__partnerPersonalInfo_languages}>
                            <ul className={styles.languages}>
                                {languages &&
                                    languages.map((languages: UserForeignLanguage) => {
                                        return (languages.skill_level !== "Native" &&
                                            <LanguagesTag languages={languages} key={languages.isocode}/>
                                        );
                                    })}
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className={styles.card__partnerGreeting}>{about}</p>
        </article>
    );
};

export default Card;
