import { FC } from 'react';
import styles from './GoBackButton.module.scss';
import cn from 'classnames';

interface GoBackButtonProps {
  onClick: () => void;
  positionClassName?: string;
}

const GoBackButton: FC<GoBackButtonProps> = ({
  onClick,
  positionClassName,
}) => {
  return (
    <button
      className={cn(styles.button, positionClassName)}
      onClick={onClick}
      type='button'
    ></button>
  );
};

export default GoBackButton;
