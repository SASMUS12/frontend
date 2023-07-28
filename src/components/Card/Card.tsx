import { FC } from 'react';

import LanguagesTag from '../UI/LanguagesTag/LanguagesTag';

import avatarSquare from '../../images/svg/card-avatar-square.svg';
import arrows from '../../images/svg/card-arrows-parallel.svg';

import CountryIcon from '../UI/CountryIcon/CountryIcon';
import UserStatusIndicator from '../UI/UserStatusIndicator/UserStatusIndicator';
import GenderAndAgeIcon from '../UI/GenderAndAgeIcon/GenderAndAgeIcon';
import { Country, UserForeignLanguage, UserNativeLanguage } from '../../utils/openapi';

import styles from './Card.module.scss';

interface IProps {
  country?: Country | null;
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

const Card: FC<IProps> = ({
  country = null,
  avatar,
  status,
  first_name,
  gender,
  gender_is_hidden,
  age,
  about,
  indicator,
  nativeLanguages,
  foreignLanguages,
}) => {
  return (
    <article className={styles.card}>
      <div className={styles.card__countryAndStatusTag}>
        <CountryIcon country={country} />
        <UserStatusIndicator indicator={indicator} status={status} />
      </div>
      <div className={styles.card__partnerAbout}>
        <img
          className={styles.card__partnerAvatar}
          src={avatar ? avatar : avatarSquare}
          alt="Аватар пользователя"
        />
        <div className={styles.card__partnerInfo}>
          <div className={styles.card__partnerPersonalInfo}>
            <p className={styles.card__partnerPersonalInfo_firstName}>{first_name}</p>
            <GenderAndAgeIcon gender={gender} age={age} gender_is_hidden={gender_is_hidden} />
            <div className={styles.card__partnerPersonalInfo_languagesTag}>
              <div className={styles.card__partnerPersonalInfo_languages}>
                <ul className={styles.languages}>
                  {nativeLanguages &&
                    nativeLanguages.map((languages: UserNativeLanguage) => (
                      <LanguagesTag languages={languages} key={languages.id} />
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
                alt="Параллельные стрелки между изученными и изучаемыми языками"
              />
              <div className={styles.card__partnerPersonalInfo_languages}>
                <ul className={styles.languages}>
                  {foreignLanguages &&
                    foreignLanguages.map((languages: UserForeignLanguage) => (
                      <LanguagesTag languages={languages} key={languages.id} />
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
