import React from 'react';

import { avatarList } from './AvatarsIcons';

import styles from './Avatars.module.scss';
import cn from 'classnames';

const Avatars = ({ selectedAvatar, setSelectedAvatar }) => {
  const handleSetAvatar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedAvatar(event.target.src);
    console.log(event.target.src);
  };

  return (
    <div className={styles.avatarsItems}>
      {avatarList &&
        avatarList.map((avatar, i) => {
          return (
            i < avatarList.length && (
              <button
                className={cn(
                  styles.avatarsItems_avatarItem,
                  selectedAvatar === avatar
                    ? styles.avatarsItems_avatarItem_selected
                    : '',
                )}
                onClick={handleSetAvatar}
              >
                <img src={avatar} alt='Вариант изображения аватара' />
              </button>
            )
          );
        })}
    </div>
  );
};

export default Avatars;
