import Modal from "../Modal/Modal";

import styles from "./LanguageLevelModal.module.scss";

const LanguageLevelModal = ({isModalOpen, setModalOpen}) => {
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return(
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
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
        </Modal>
    );
};

export default LanguageLevelModal;
