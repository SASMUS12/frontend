import React, { FC, ReactNode, useEffect } from 'react';

import ModalOverlay from '../ModalOverlay/ModalOverlay';

import styles from './Modal.module.scss';
import cn from 'classnames';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  className?: string;
}

const Modal: FC<IModalProps> = ({ isOpen, onClose, children, className }) => {
  // Закрытие при нажатии на Esc
  const handleCloseByEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleCloseByEsc);
      return () => {
        document.removeEventListener('keydown', handleCloseByEsc);
      };
    }
  }, [isOpen]);

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className={cn(styles.modal__container, className)}>
        <button
          type='button'
          className={styles.modal__closeButton}
          onClick={onClose}
        ></button>
        {children}
      </div>
    </ModalOverlay>
  );
};

export default Modal;
