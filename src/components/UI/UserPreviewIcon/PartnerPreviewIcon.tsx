import styles from './PartnerPreviewIcon.module.scss';

const PartnerPreviewIcon = () => {
  return (
    <div className={styles.partnerPreview}>
      <img className={styles.partnerPreview__avatar} alt='partner avatar'></img>
      <div className={styles.partnerPreview__info}>
        <p className={styles.partnerPreview__name}>Name</p>
        <p className={styles.partnerPreview__status}>Status</p>
      </div>
    </div>
  );
};

export default PartnerPreviewIcon;
