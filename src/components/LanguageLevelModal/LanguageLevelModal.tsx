import React from "react";
import Modal from "../Modal/Modal";

import level_1 from '../../images/SkillLevel/Level1.svg';
import level_2 from '../../images/SkillLevel/Level2.svg';
import level_3 from '../../images/SkillLevel/Level3.svg';
import level_4 from '../../images/SkillLevel/Level4.svg';
import level_5 from '../../images/SkillLevel/Level5.svg';
import level_6 from '../../images/SkillLevel/Level6.svg';

import styles from "./LanguageLevelModal.module.scss";

interface LanguageLevelModalProps {
    isModalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    pageName: string;
}

interface ModalStyles {
    [key: string]: string;
}
const LanguageLevelModal: React.FC<LanguageLevelModalProps> = ({ isModalOpen, setModalOpen, pageName }) => {
    const handleCloseModal = () => {
      setModalOpen(false);
    };

    const modalStyles: ModalStyles = {
        Sort: styles.sortModal,
    };
    
    const renderModalContent = () => {
        if (pageName === "Sort") {
          return (
            <>
                <article className={styles.sortModal__item}>
                    <div className={styles.sortModal__languages}>
                        <h3 className={styles.sortModal__languages_subtitle}>Новичок</h3>
                        <p className={styles.sortModal__languages_text}>
                            Может представиться, простые тексты и базовые выражения
                        </p>
                    </div>
                    <img src={level_1} alt="Новичок" className={styles.sortModal__image} />
                </article>
                <article className={styles.sortModal__item}>
                    <div className={styles.sortModal__languages}>
                        <h3 className={styles.sortModal__languages_subtitle}>Любитель</h3>
                        <p className={styles.sortModal__languages_text}>
                            Может рассказать о себе, своих увлечениях, поддержать диалог на простые темы.
                        </p>
                    </div>
                    <img src={level_2} alt="Любитель" className={styles.sortModal__image} />
                </article>
                <article className={styles.sortModal__item}>
                    <div className={styles.sortModal__languages}>
                        <h3 className={styles.sortModal__languages_subtitle}>Профессионал</h3>
                        <p className={styles.sortModal__languages_text}>
                            Может выразить личное мнение с аргументацией, поддержание диалога
                        </p>
                    </div>
                    <img src={level_3} alt="Профессионал" className={styles.sortModal__image} />
                </article>
                <article className={styles.sortModal__item}>
                    <div className={styles.sortModal__languages}>
                        <h3 className={styles.sortModal__languages_subtitle}>Эксперт</h3>
                        <p className={styles.sortModal__languages_text}>
                            Может выражаться естественно и без усилий, вспоминать интересные обороты речи
                        </p>
                    </div>
                    <img src={level_4} alt="Эксперт" className={styles.sortModal__image} />
                </article>
                <article className={styles.sortModal__item}>
                    <div className={styles.sortModal__languages}>
                        <h3 className={styles.sortModal__languages_subtitle}>Гуру</h3>
                        <p className={styles.sortModal__languages_text}>
                            Может поддержать дискуссии на узконаправленные темы
                        </p>
                    </div>
                    <img src={level_5} alt="Гуру" className={styles.sortModal__image} />
                </article>
                <article className={styles.sortModal__item}>
                    <div className={styles.sortModal__languages}>
                        <h3 className={styles.sortModal__languages_subtitle}>Носитель</h3>
                        <p className={styles.sortModal__languages_text}>
                            Вырос в среде языка
                        </p>
                    </div>
                    <img src={level_6} alt="Носитель" className={styles.sortModal__image} />
                </article>
            </>
          );
        } else {
          return (
            <>
                <article className={styles.modal__item}>
                    <h3 className={styles.modal__subtitle_languages}>Новичок</h3>
                    <p className={styles.modal__text_languages}>
                        Может представиться, простые тексты и базовые выражения
                    </p>
                </article>
                <article className={styles.modal__item}>
                    <h3 className={styles.modal__subtitle_languages}>Любитель</h3>
                    <p className={styles.modal__text_languages}>
                        Может рассказать о себе, своих увлечениях, поддержать диалог на простые темы.
                    </p>
                </article>
                <article className={styles.modal__item}>
                    <h3 className={styles.modal__subtitle_languages}>Профессионал</h3>
                    <p className={styles.modal__text_languages}>
                        Может выразить личное мнение с аргументацией, поддержание диалога
                    </p>
                </article>
                <article className={styles.modal__item}>
                    <h3 className={styles.modal__subtitle_languages}>Эксперт</h3>
                    <p className={styles.modal__text_languages}>
                        Может выражаться естественно и без усилий, вспоминать интересные обороты речи
                    </p>
                </article>
                <article className={styles.modal__item}>
                    <h3 className={styles.modal__subtitle_languages}>Гуру</h3>
                    <p className={styles.modal__text_languages}>
                        Может поддержать дискуссии на узконаправленные темы
                    </p>
                </article>
                <article className={styles.modal__item}>
                    <h3 className={styles.modal__subtitle_languages}>Носитель</h3>
                    <p className={styles.modal__text_languages}>
                        Вырос в среде языка
                    </p>
                </article>
            </>
          );
        };
      };
    
      return (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} className={modalStyles[pageName]}>
          {renderModalContent()}
        </Modal>
      );
};

export default LanguageLevelModal;