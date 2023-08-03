import React, {FC, ReactNode, useEffect, useRef} from 'react';

import styles from './ModalOverlay.module.scss';
import cn from "classnames";

interface IModalOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
}

const ModalOverlay: FC<IModalOverlayProps> = ({isOpen, onClose, children}) => {
    const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    // Закрытие по overlay
    const setCloseByOverlayListener = (modal: any) => {
        modal.addEventListener("mousedown", (event: MouseEvent) => {
            const targetClasses = (event.target as Element).classList;
            const regExp = /^(ModalOverlay_modalOverlay_opened__)[\w]?/;
            for (let i = 0; i < targetClasses.length; i++) {
                if (regExp.test(targetClasses[i])) {
                    onClose();
                }
            }
        });
    }

    // Закрытие при нажатии на Esc
    const handleCloseByEsc = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        setCloseByOverlayListener(modalRef.current);
    }, []);

    useEffect(() => {
        if (isOpen) {
            // Список действий внутри одного хука
            document.addEventListener("keydown", handleCloseByEsc);
            // Возвращаем функцию, которая удаляет эффекты
            return () => {
                document.removeEventListener("keydown", handleCloseByEsc);
            };
        }
    }, [isOpen]);


    return <div ref={modalRef} className={cn(styles.modalOverlay, isOpen ? styles.modalOverlay_opened : {})}>
        {children}
    </div>;
}

export default ModalOverlay;
