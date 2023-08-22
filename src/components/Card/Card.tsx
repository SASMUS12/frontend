import { FC } from 'react';

import LanguagesTag from '../UI/LanguagesTag/LanguagesTag';

import {
  сardRandomMaleAvatar,
  сardRandomFemaleAvatar,
} from './CardRandomAvatar';
import arrows from '../../images/svg/card-arrows-parallel.svg';

import CountryIcon from '../UI/CountryIcon/CountryIcon';
import UserStatusIsOnline from '../UI/UserStatusIsOnline/UserStatusIsOnline';
import GenderAndAgeIcon from '../UI/GenderAndAgeIcon/GenderAndAgeIcon';
import {
  Country,
  UserNativeLanguage,
  UserForeignLanguage,
} from '../../utils/openapi';

import styles from './Card.module.scss';
import cn from 'classnames';

interface ICards {
  className?: string;
  country?: Country | null;
  is_online: boolean;
  avatar?: string;
  first_name?: string;
  gender?: string;
  gender_is_hidden: boolean;
  age?: string;
  about?: string;
  nativeLanguages?: any;
  foreignLanguages?: any;
}

const Card: FC<ICards> = ({
  className,
  country = null,
  avatar,
  first_name,
  gender,
  gender_is_hidden,
  age,
  about,
  is_online,
  nativeLanguages,
  foreignLanguages,
}) => {
  const getUserAvatar = () => {
    return avatar
      ? avatar
      : gender === 'Male'
      ? сardRandomMaleAvatar()
      : сardRandomFemaleAvatar();
  };

  return (
    <article className={cn(styles.card, className)}>
      <div className={styles.card__countryAndStatusTag}>
        <CountryIcon country={country} />
        <UserStatusIsOnline is_online={is_online} />
      </div>
      <div className={styles.card__partnerAbout}>
        <img
          className={styles.card__partnerAvatar}
          src={`${getUserAvatar()}`}
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
            />
            <div className={styles.card__partnerPersonalInfo_languagesTag}>
              <div className={styles.card__partnerPersonalInfo_languages}>
                <ul className={styles.languages}>
                  {nativeLanguages &&
                    nativeLanguages.map((languages: UserNativeLanguage) => (
                      <LanguagesTag
                        languages={languages}
                        key={languages.isocode}
                      />
                    ))}
                </ul>
              </div>
              <img
                className={
                  nativeLanguages.length > 0 || foreignLanguages.length > 0
                    ? styles.card__partnerPersonalInfo_arrows
                    : styles.card__partnerPersonalInfo_arrows_hidden
                }
                src={arrows}
                alt='Параллельные стрелки между изученными и изучаемыми языками'
              />
              <div className={styles.card__partnerPersonalInfo_languages}>
                <ul className={styles.languages}>
                  {foreignLanguages &&
                    foreignLanguages.map((languages: UserForeignLanguage) => (
                      <LanguagesTag
                        languages={languages}
                        key={languages.isocode}
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
};

export default Card;
