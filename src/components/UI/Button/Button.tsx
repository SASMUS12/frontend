import { MouseEventHandler, ReactNode, FC } from 'react';

import cn from 'classnames';

import styles from './Button.module.scss';

interface Props {
  className?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'transparent';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

export const Button: FC<Props> = ({
  className,
  type,
  variant = 'primary',
  disabled,
  onClick,
  children,
}) => {
  return (
    <button
      className={cn(styles.button, styles[`variant-${variant}`], className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
