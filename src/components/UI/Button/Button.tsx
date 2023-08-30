import { MouseEventHandler, ReactNode, FC } from 'react';

import cn from "classnames";

import styles from "./Button.module.scss";

interface Props {
  className?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'transparent' | 'gray';
  size?: 'small' | 'big';
  fontSize?: '13' | '15' | '16';

  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

export const Button: FC<Props> = ({
  className,
  type,
  variant = 'primary',
  size = 'big',
  fontSize = '16',
  disabled,
  onClick,
  children,
}) => {
  return (
    <button
      className={cn(
        className,
        styles.button,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        styles[`fontSize-${fontSize}`],
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
