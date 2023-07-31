import React, {useRef, useEffect, FC, ReactNode} from "react";
import ReactDOM from 'react-dom'

import ModalOverlay from "../ModalOverlay/ModalOverlay";

import styles from "./InfoTooltip.scss"
import cn from "classnames";

interface IInfoTooltipProps {
  className?: string;
  isOpen: boolean;
  onClose: any;
  children: ReactNode;
}

const InfoTooltip: FC<IInfoTooltipProps> = ({ className, isOpen, onClose, children }) => {
  const popupRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  // useEffect(() => {
  //   popupRef.current.addEventListener("mousedown", (event: MouseEvent) => {
  //     const targetClasses = (event.target as Element).classList;
  //     if (targetClasses.contains("popup_opened")) {
  //       onClose();
  //     }
  //   });
  // }, []);

  //Закрытие popup при нажатии на Esc
  const handleCloseByEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

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

  return (
    <div
      className={cn(styles.infoTooltip, styles.popup, isOpen && styles.popup_opened)}
      // ref={popupRef}
    >
      <div className= {styles.infoTooltip__container}>
        <button
          type="button"
          className= {styles.infoTooltip__closeButton}
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>
  );
}

export default InfoTooltip;
