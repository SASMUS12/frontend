import React from 'react';
import Modal from '../Modal/Modal';

import { Levels } from './Levels';

import styles from './LanguageLevelModal.module.scss';

interface LanguageLevelModalProps {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pageName: string;
}

const LanguageLevelModal: React.FC<LanguageLevelModalProps> = ({
  isModalOpen,
  setModalOpen,
  pageName,
}) => {
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      className={styles.modal}
    >
      {Levels.map((level) => (
        <article className={styles.modal__item}>
          <div className={styles.modal__languages}>
            <h3 className={styles.modal__languages_title}>{level.name}</h3>
            <p className={styles.modal__languages_text}>{level.description}</p>
          </div>
          <img
            src={level.level}
            alt={level.name}
            className={
              pageName === 'Sort'
                ? styles.modal__image
                : styles.modal__image_hidden
            }
          />
        </article>
      ))}
    </Modal>
  );
};

export default LanguageLevelModal;
