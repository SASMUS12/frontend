import { observer } from 'mobx-react-lite';

import Modal from '../Modal/Modal';

import errorImage from '../../images/error-modal-image.png';

import styles from './ErrorModal.module.scss';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
}

const ErrorModal = ({ isOpen, onClose, errorMessage }: ErrorModalProps) => {
  return (
    <Modal className={styles.modal} isOpen={isOpen} onClose={onClose}>
      <img
        className={styles.modal__image}
        src={errorImage}
        alt='Думающий человек'
      />
      <p className={styles.modal__text}>{errorMessage}</p>
    </Modal>
  );
};

export default observer(ErrorModal);
