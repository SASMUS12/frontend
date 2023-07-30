import { FC } from 'react';
import styles from './UserStatusIndicator.module.scss';
import logInIndicator from '../../../images/svg/card-indicator-logIn.svg';
import logOutIndicator from '../../../images/svg/card-indicator-logOut.svg';

interface UserStatusIndicatorProps {
  indicator: boolean;
  status: string;
}

const UserStatusIndicator: FC<UserStatusIndicatorProps> = ({ indicator, status }) => {
  const indicatorIcon = indicator ? logInIndicator : logOutIndicator;

  return (
    <div className={styles.card__tag}>
      <img
        className={styles.card__indicator}
        src={indicatorIcon}
        alt={`Индикатор статуса пользователя (${indicator ? 'в сети' : 'не в сети'})`}
      />
      <p className={styles.card__text}>{status}</p>
    </div>
  );
};

export default UserStatusIndicator;
