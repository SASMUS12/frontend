import React, { FC } from 'react';
import styles from './CountryIcon.module.scss';
import { Country } from '../../../utils/openapi';

interface CountryIconProps {
  country: Country | null;
}

const CountryIcon: FC<CountryIconProps> = ({ country }) => {
  return (
    <div className={styles.card__tag}>
      {country && (
        <img
          className={country ? styles.card__flag : styles.card__flag_hidden}
          src={country.flag_icon}
          alt='Флаг страны пользователя'
        />
      )}
      <p className={styles.card__text}>{country && country.name}</p>
    </div>
  );
};

export default CountryIcon;
