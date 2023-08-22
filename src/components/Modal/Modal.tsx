import React, { FC, ReactNode, useEffect } from 'react';

import ModalOverlay from '../ModalOverlay/ModalOverlay';

import styles from './Modal.module.scss';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: FC<IModalProps> = ({ isOpen, onClose, children }) => {
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
      <div className={styles.modal__container}>
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
