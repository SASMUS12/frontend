import { FC } from 'react';
import cn from 'classnames';
import styles from './MenuButton.module.scss';

interface MenuButtonProps {
  onClick: () => void;
  isActive: boolean;
  title: string;
}

const MenuButton: FC<MenuButtonProps> = ({ onClick, title, isActive }) => {
  const buttonActiveClass = isActive ? styles.button_active : '';

  return (
    <button
      className={cn(styles.button, buttonActiveClass)}
      onClick={onClick}
      type='button'
    >
      {title}
    </button>
  );
};

export default MenuButton;
