import styles from "./Reviews.module.scss";

const Reviews = () => {
  return(
    <section className={styles.review}>
      <h3 className={styles.review__title}>Отзывы</h3>
      <p className={styles.review__text}>У тебя пока нет отзывов, начни общаться и через неделю твой собеседник сможет оставить тут отзыв.</p>
    </section>
  );
};

export default Reviews;