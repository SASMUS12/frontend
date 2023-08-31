import styles from './ChatHeader.module.scss';
import PartnerPreviewIcon from '../../../components/UI/UserPreviewIcon/PartnerPreviewIcon';

const ChatHeader = () => {
  return (
    <div className={styles.chatHeader}>
      <PartnerPreviewIcon />
      <div></div>
    </div>
  );
};

export default ChatHeader;
