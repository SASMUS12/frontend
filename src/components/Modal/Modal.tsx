import React, {FC, useRef} from "react";
import ReactDOM from 'react-dom'
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import "./modal.css";

type ScriptEvent = () => void;

const modalRoot = (document.getElementById("react-modals") as Element);

interface IModalProps {
  isOpen: boolean;
  onClose: ScriptEvent; 
  children: React.ReactNode;
}

const Modal: FC<IModalProps> = ({ isOpen, onClose, children }) => {

  const overlay = useRef() as React.MutableRefObject<HTMLDivElement>;

  React.useEffect(() => {
    const closeByClick = (event: MouseEvent) => {
      if (event !== null && event.target) {if ((event.target as Element).classList.contains('modalOverlay')) {
        handleClose();
      }}
    };
    const element = overlay.current;
    if (element && overlay && overlay.current) {
      element.addEventListener('click', closeByClick);
        return () => {
          element.removeEventListener('click', closeByClick);
        };
    }
  }, []);

  function handleClose() {
    onClose()
  }

  React.useEffect(() => {
    const escFunction = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", escFunction); 
    return () => {
    document.removeEventListener("keydown", escFunction);
    }
  }, [])

  return ReactDOM.createPortal (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div ref={overlay}>
        <ModalOverlay isOpen={isOpen} />
      </div>
      <div className='modal__container'>
        <div className="modal__button-container" test-id="modalCloseIconContainer">
          <div
            onClick={handleClose}
          />
        </div>
        {children}
       </div>
    </div>, modalRoot
  );
}

export default Modal;
