import { useState } from 'react';
import IconButton from "../Buttons/IconButton/IconButton";
import search from '../../../images/userProfile/search.svg';
import control from '../../../images/userProfile/control.svg';
import styles from "./Topics.module.scss";

const Topics = ({ isEditing, interests, setEditedData}) => {
  
  const [editedInterests, setEditedInterests] = useState([interests]);
  const [inputValue, setInputValue] = useState('');

  const handleSetThemes = (event) => {
    console.log('event.target.value', event.target.value);
    setInputValue(event.target.value);
  };

  const handleAddTheme = (event) => {
    if (event.key === 'Enter') {
      const newTheme = inputValue.trim();
      if (newTheme !== '') {
        setEditedInterests((prevInterests) => [...prevInterests, newTheme]);
        setEditedData([...interests, newTheme]);
        setInputValue('');
      }
    }
  };

  const handleRemoveTheme = (index) => {
    const updatedInterests = editedInterests.filter((_, i) => i !== index);
    setEditedInterests(updatedInterests);
  };


  return(
    <>
    {!isEditing ? (
      <div className={styles.topics}>
        <h3 className={styles.title}>Темы для общения</h3>
        <div className={styles.lystThemes}>
          {interests.map((item, index) => (
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
          {editedInterests.map((item, index) => (
            <span key={index} className={styles.themes}>{item}
              <span className={styles.themes__icon}>
                <IconButton 
                  icon={control} 
                  handleFunction={() => handleRemoveTheme(index)}
                  iconWidth={16} 
                  iconHeight={16}
                /></span>
            </span>            
        ))}
        </div>
      </div>)}
    </>
  );
};

export default Topics;