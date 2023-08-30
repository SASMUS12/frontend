import styles from "./Reviews.module.scss";

const Reviews = () => {
  return (
    <section className={styles.review}>
      <h3 className={styles.review__title}>Отзывы</h3>
      <p className={styles.review__text}>
        У вас пока нет отзывов, начните общаться, и через неделю ваш собеседник
        сможет оставить здесь отзыв.
      </p>
    </section>
  );
};

export default Reviews;
