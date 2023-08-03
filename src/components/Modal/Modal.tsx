import React, {useRef, useEffect, FC, ReactNode} from "react";
import {observer} from "mobx-react-lite";

import styles from "./Modal.module.scss"
import cn from "classnames";

import {useModel} from "../SignupSigninForm/model";

interface ModalProps {
    className?: string;
    children?: ReactNode;
}

const Modal: FC<ModalProps> = ({
                                   className,
                                   children
                               }) => {
    const model = useModel();

    const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const setCloseByOverlayListener = (modal: any) => {
        modal.addEventListener("mousedown", (event: MouseEvent) => {
            const targetClasses = (event.target as Element).classList;
            const regExp = /^(Modal_modal_opened__)[\w]?/;
            for (let i = 0; i < targetClasses.length; i++) {
                if (regExp.test(targetClasses[i])) {
                    model.handleCloseModal();
                }
            }
        });
    }

    const handleCloseByEsc = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            model.handleCloseModal();
        }
    };

    useEffect(() => {
        setCloseByOverlayListener(modalRef.current);
    }, []);

    // Закрытие popup при нажатии на Esc
    useEffect(() => {
        if (model.isModalOpen) {
            // Список действий внутри одного хука
            document.addEventListener("keydown", handleCloseByEsc);
            // Возвращаем функцию, которая удаляет эффекты
            return () => {
                document.removeEventListener("keydown", handleCloseByEsc);
            };
        }
    }, [model.isModalOpen]);

    return (
        <div ref={modalRef} className={cn(styles.modal, model.isModalOpen ? styles.modal_opened : {})}>
            <div className={styles.modal__container}>
                <button
                    type="button"
                    className={styles.modal__closeButton}
                    onClick={model.handleCloseModal}
                >
                </button>
                {children}
            </div>
        </div>
    );
}

export default observer(Modal);
