import React, {FC, ReactNode} from "react";

import ModalOverlay from "../ModalOverlay/ModalOverlay";

import styles from "./Modal.module.scss"

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
}

const Modal: FC<IModalProps> = ({isOpen, onClose, children}) => {
    return (
        <ModalOverlay isOpen={isOpen} onClose={onClose}>
            <div className={styles.modal__container}>
                <button
                    type="button"
                    className={styles.modal__closeButton}
                    onClick={onClose}
                >
                </button>
                {children}
            </div>
        </ModalOverlay>
    );
}

export default Modal;
