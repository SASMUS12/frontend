import styles from "./About.module.scss";


const About = ({isEditing, aboutMe, setAboutMe, learningLanguage, setLearningLanguage}) => {

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  }
  
  return(
    <>
    {!isEditing ? (
      <div className={styles.about}>
        <section className={styles.about__section}>
          <h3 className={styles.about__title}>Обо мне</h3>
          <p className={styles.about__subtitle}>{aboutMe}</p>
        </section>
        <section>
          <h3 className={styles.about__title}>Я изучаю язык, чтобы</h3>
          <p className={styles.about__subtitle}>{learningLanguage}</p>
        </section>
      </div>
    ):(
      <div className={styles.about}>
        <section className={styles.about__section}>
        <h3 className={styles.about__title}>Обо мне</h3>
        <textarea
          value={aboutMe}
          onChange={handleChange(setAboutMe)}
          className={styles.about__input}
          rows={3}
          placeholder='Напиши несколько предложений о себе, чтобы тебя нашли партнеры со схожими интересами или стилем жизни'
        />
        </section>
        <section>
        <h3 className={styles.about__title}>Я изучаю язык, чтобы</h3>
        <input
          type="text"
          value={learningLanguage}
          onChange={handleChange(setLearningLanguage)}
          className={styles.about__input}
          placeholder='Расскажи о своей цели'
        />
        </section>
      </div>
      )}
    </>
  );
};

export default About;