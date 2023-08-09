import search from '../../../images/userProfile/search.svg';
import control from '../../../images/userProfile/control.svg';
import styles from "./Topics.module.scss";
import IconButton from "../Buttons/IconButton/IconButton";

const Topics = ({ isEditing, themes, setThemes, inputValue, setInputValue }) => {

  const handleSetThemes = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTheme = (event) => {
    if (event.key === 'Enter') {
      const newTheme = inputValue.trim();
      if (newTheme !== '') {
        setThemes([...themes, newTheme]);
        setInputValue('');
      }
    }
  };


  return(
    <>
    {!isEditing ? (
      <div className={styles.topics}>
        <h3 className={styles.title}>Темы для общения</h3>
        <div className={styles.lystThemes}>
          {themes.map((item, index) => (
            <span key={index} className={styles.themes}>{item}</span>
        ))}
        </div>
      </div>
      ):(
      <div className={styles.topics}>
        <h3 className={styles.title}>Выберите темы для общения</h3>
        <div className={styles.ded}>
        <img src={search} alt="Поиск" className={styles.topics__searchIcon} />
        <input 
          type='text' 
          id='partnerThemes' 
          name='partnerThemes'
          placeholder="Начните вводить тему" 
          className={styles.topics__input}
          value={inputValue}
          onChange={handleSetThemes}
          onKeyDown={handleAddTheme} 
          />
        </div>
        <div className={styles.lystThemes}>
          {themes.map((item, index) => (
            <span key={index} className={styles.themes}>{item}
              <span className={styles.themes__icon}><IconButton icon={control} /></span>
            </span>            
        ))}
        </div>
      </div>)}
    </>
  );
};

export default Topics;