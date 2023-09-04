import { FC } from 'react';

import CountryIcon from '../UI/CountryIcon/CountryIcon';
import UserStatusIsOnline from '../UI/UserStatusIsOnline/UserStatusIsOnline';
import GenderAndAgeIcon from '../UI/GenderAndAgeIcon/GenderAndAgeIcon';
import LanguagesTag from '../UI/LanguagesTag/LanguagesTag';

import arrows from '../../images/svg/card-arrows-parallel.svg';

import {
  UserLanguage,
  Country,
  GenderEnum,
  NullEnum,
} from '../../utils/openapi';

import styles from './Card.module.scss';

interface ICards {
  first_name: string;
  avatar: string;
  age: string;
  country: Country;
  languages: UserLanguage[];
  gender: GenderEnum | NullEnum | null;
  about: string;
  is_online: boolean;
  gender_is_hidden: boolean;
  age_is_hidden?: boolean;
}

const Card: FC<ICards> = ({
  first_name,
  avatar,
  age,
  country,
  languages,
  gender,
  about,
  is_online,
  gender_is_hidden,
  age_is_hidden,
}: ICards) => {
  return (
    <article className={styles.card}>
      <div className={styles.card__countryAndStatusTag}>
        <CountryIcon country={country} />
        <UserStatusIsOnline is_online={is_online} />
      </div>
      <div className={styles.card__partnerAbout}>
        <img
          className={styles.card__partnerAvatar}
          src={avatar}
          alt='Аватар пользователя'
        />
        <div className={styles.card__partnerInfo}>
          <div className={styles.card__partnerPersonalInfo}>
            <p className={styles.card__partnerPersonalInfo_firstName}>
              {first_name}
            </p>
            <GenderAndAgeIcon
              gender={gender}
              age={age}
              gender_is_hidden={gender_is_hidden}
              age_is_hidden={age_is_hidden}
            />
            <div className={styles.card__partnerPersonalInfo_languagesTag}>
              <div className={styles.card__partnerPersonalInfo_languages}>
                <ul className={styles.languages}>
                  {languages &&
                    languages.map((languages: UserLanguage) => {
                      return (
                        languages.skill_level === 'Native' && (
                          <LanguagesTag
                            languages={languages}
                            key={languages.isocode}
                          />
                        )
                      );
                    })}
                </ul>
              </div>
              <img
                className={styles.card__partnerPersonalInfo_arrows}
                src={arrows}
                alt='Параллельные стрелки между изученными и изучаемыми языками'
              />
              <div className={styles.card__partnerPersonalInfo_languages}>
                <ul className={styles.languages}>
                  {languages &&
                    languages.map((languages: UserLanguage) => {
                      return (
                        languages.skill_level !== 'Native' && (
                          <LanguagesTag
                            languages={languages}
                            key={languages.isocode}
                          />
                        )
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
