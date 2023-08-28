import React from 'react';

import { avatarList } from './AvatarsIcons';

import styles from './Avatars.module.scss';
import cn from 'classnames';

interface AvatarProps {
  selectedAvatar: string;
  setSelectedAvatar: (selectedAvatar: string) => void;
}

const Avatars = ({ selectedAvatar, setSelectedAvatar }: AvatarProps) => {
  const handleSetAvatar = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLImageElement;
    setSelectedAvatar(target.src);
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
