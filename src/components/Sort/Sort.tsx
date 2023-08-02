import React, { useState } from "react";
import styles from "../Sort/Sort.module.scss";
import LanguageLevel, {Language} from "../LanguageLevel/LanguageLevel";
import { Button } from "../UI/Button/Button";
import plus from '../../images/svg/plus-in-circle.svg';
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";

interface SortProps {
  value: any;
  onChangeSort: (sortType: any) => void;
  isOpen: boolean;
  languagesData: Language[];

}

 const Sort: React.FC<SortProps> = ({ value, onChangeSort, isOpen, languagesData }) => {    
    const [leftValue, setLeftValue] = useState<number>(18);
    const [rightValue, setRightValue] = useState<number>(40);
    const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);
    const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);
    const [sortValue, setSortValue] = useState({});
    // const [languageCounter, setLanguageCounter] = useState(0);
    


    const handleSliderChange = (left: number, right: number) => {
      setLeftValue(left);
      setRightValue(right);
    };

    const handleOpenLanguageMenu = () => {
      setLanguageMenuOpen(true);
    };

    const handleAddLanguage = (language: Language) => {
      setSelectedLanguages([...selectedLanguages, language]);
      setLanguageMenuOpen(false);
    };

    const handleRemoveLanguage = (language: Language) => {
      const updatedLanguages = selectedLanguages.filter((lang) => lang.id !== language.id);
      setSelectedLanguages(updatedLanguages);
    };

    // const generateLanguageId = () => {
    //   setLanguageCounter(languageCounter + 1);
    //   return languageCounter;
    // };
  

    return (
      <div className={isOpen ? styles.popup__sort : styles.popup__sort_hidden}>
            <div className={styles.popup__cantry}>
              <h2 >Страна партнера</h2>
              <div className={styles.popup__enter}>
                <input
                  type="text"
                  id="searchInput"
                  placeholder="Начните вводить название"
                />
              </div>
            </div>
            <h2>Язык партнера</h2>
            <LanguageLevel
              languages={languagesData}
              onAdd={(language) => handleAddLanguage(language)}
              onRemove={(language) => handleRemoveLanguage(language)}
            />
            {selectedLanguages.map((language, index) => (
              <LanguageLevel
                key={index}
                languages={languagesData}
                onAdd={(language) => handleAddLanguage(language)}
                onRemove={(language) => handleRemoveLanguage(language)}
              />
            ))}
            {isLanguageMenuOpen && (
              <LanguageLevel languages={languagesData} onAdd={(name) => handleAddLanguage(name)} />
            )}
            <div className={styles.popup__add}>
              <Button 
                onClick={handleOpenLanguageMenu}
                className={styles.popup__addButton}
                children={"добавить язык"} 
              />
            </div>
            <div className={styles.popup__partner}>
            <h2>О партнере</h2>
            <div className={styles.popup__gender}>
              <h3>Пол</h3>
              <Button                   
                children={"Мужчина"} 
              />
              <Button
                children={"Женщина"} 
              />
             </div>
            </div>
            <div className={styles.popup__age}>
              <h3>Возраст</h3>
              <MultiRangeSlider 
                minValue={18}
                maxValue={100}
                leftValue={leftValue}
                rightValue={rightValue}
                onChange={handleSliderChange}
              />
            </div>
            <Button
              className={styles.popup__findButton}
              children={"Найти"}
            />
      </div>
    );
};
    
export default Sort;