import { FC } from "react";

import logInIndicator from "../../../images/svg/card-indicator-logIn.svg";
import logOutIndicator from "../../../images/svg/card-indicator-logOut.svg";

import styles from "./UserStatusIsOnline.module.scss";

interface IUserStatusIsOnline {
  is_online: boolean;
}

const UserStatusIsOnline: FC<IUserStatusIsOnline> = ({ is_online }) => {
  const indicatorIcon = is_online ? logInIndicator : logOutIndicator;

  return (
    <div className={styles.card__tag}>
      <img
        className={styles.card__isOnline}
        src={indicatorIcon}
        alt={`Индикатор статуса пользователя (${
          is_online ? "в сети" : "не в сети"
        })`}
      />
      <p className={styles.card__text}>{is_online ? "в сети" : "не в сети"}</p>
    </div>
  );
};

export default UserStatusIsOnline;
