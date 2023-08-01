import styles from "./About.module.scss";


const About = () => {
  return(
    <>
      <div className={styles.about}>
        <section className={styles.about__section}>
          <h3 className={styles.about__title}>Обо мне</h3>
          <p className={styles.about__subtitle}>Hi! I work as an interior designer and often meet with foreign customers, I want to improve my English to communicate fluently. I am looking for a person who could guide me and correct pronunciation mistakes.</p>
        </section>
        <section>
          <h3 className={styles.about__title}>Я изучаю язык, чтобы</h3>
          <p className={styles.about__subtitle}>improve conversational level</p>
        </section>
      </div>
    </>
  );
};

export default About;