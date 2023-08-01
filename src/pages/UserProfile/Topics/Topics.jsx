import styles from "./Topics.module.scss";

const Topics = () => {

  const array = ['Русская культура', 'Путешествия', 'Дизайн', 'Кулинария', 'Книги', 'Языки', 'Спорт'];

  return(
    <>
      <div className={styles.topics}>
        <h3 className={styles.title}>Темы для общения</h3>
        <div className={styles.lystThemes}>
          {array.map((item, index) => (
            <span key={index} className={styles.themes}>{item}</span>
        ))}
        </div>
      </div>
    </>
  );
};

export default Topics;