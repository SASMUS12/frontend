import React, { FC } from 'react';
import styles from "./About.module.scss";

interface AboutProps {
  isEditing: boolean;
  about: string;
  setAboutMe: (value: string) => void; 
}

const About: FC<AboutProps> = ({
  isEditing,
  about,
  setAboutMe,
}) => {
  
  return(
    <>
    {!isEditing ? (
      <div className={styles.about}>
        <section className={styles.about__section}>
          <h3 className={styles.about__title}>Обо мне</h3>
          <p className={styles.about__subtitle}>{about}</p>
        </section>
        <section>
          <h3 className={styles.about__title}>Я изучаю язык, чтобы</h3>
        </section>
      </div>
    ):(
      <div className={styles.about}>
        <section className={styles.about__section}>
        <h3 className={styles.about__title}>Обо мне</h3>
        <textarea
          value={about}
          onChange={(event) => setAboutMe(event.target.value)} 
          className={styles.about__input}
          rows={3}
          placeholder='Напиши несколько предложений о себе, чтобы тебя нашли партнеры со схожими интересами или стилем жизни'
        />
        </section>
        <section>
        <h3 className={styles.about__title}>Я изучаю язык, чтобы</h3>
        <input
          type="text"
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