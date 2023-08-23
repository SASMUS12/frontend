import React, { useState, useMemo } from 'react';

import styles from "../Sort/Sort.module.scss";
import CountrySelection from "../CountrySelection/CountrySelection";
import LanguageModule from "../LanguageModule/LanguageModule";
import Gender from "../Gender/Gender";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";

import { Button } from "../UI/Button/Button";
import { Country, Language, SkillLevelEnum } from '../../utils/openapi';

// type Filters = {
//   native_languages: string;
//   foreign_languages: {
//     language: string;
//     skill_level: SkillLevelEnum;
//   }[];
//   gender: string | null;
//   age: string;
//   country: string;
// };

interface SortProps {
  value: any;
  onChangeSort: (sortType: any) => void;
  isOpen: boolean;
  languagesData: Language[];
  countriesData: Country[];
}

const Sort: React.FC<SortProps> = ({ onChangeSort, isOpen }) => {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [leftValue, setLeftValue] = useState<number>(18);
  const [rightValue, setRightValue] = useState<number>(40);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedLanguagesAndLevels, setSelectedLanguagesAndLevels] = useState<
    { language: Language | null; skillLevels: SkillLevelEnum[] }[]
  >([]);
  


  const initialLanguageAndLevels = useMemo(() => {
    return { language: null, skillLevels: [] };
  }, []);

  const handleSliderChange = (left: number, right: number) => {
    setLeftValue(left);
    setRightValue(right);
  }; 
  

  const handleClearFilter = () => {   
    setSelectedLanguagesAndLevels([initialLanguageAndLevels]);
    selectedLanguagesAndLevels.forEach(item => {
      item.language = null;
      item.skillLevels = [];
    });
    setSelectedLanguagesAndLevels([...selectedLanguagesAndLevels]);
    setLeftValue(18);
    setRightValue(40);
  };

  const handleFindButtonClick = () => {
    
  //onChangeSort(filters);

  };

  return (
    <div className={isOpen ? styles.popup__sort : styles.popup__sort_hidden}>
      <div className={styles.popup__cantry}>
        <h2 className={styles.subtitle}>Страна партнера</h2>
        <CountrySelection
          pageName="Sort"
          onSelectedCountriesChange={setSelectedCountries}
        />
      </div>  
      <div className={styles.languageHelp}>
        <h2 className={styles.subtitle}>Язык партнера</h2>
      </div>
      <LanguageModule
        pageName="Sort" 
        initialLanguageAndLevels={{ language: null, skillLevels: [] }}
        selectedLanguagesAndLevels={selectedLanguagesAndLevels}
        setSelectedLanguagesAndLevels={setSelectedLanguagesAndLevels}
      />
      <div className={styles.partner}>
        <h2 className={styles.subtitle}>О партнере</h2>
        <div className={styles.partner__gender}>
          <h3 className={styles.partner__gender_subtitle}>Пол</h3>
          <Gender
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          componentName="Sort"
          />
        </div>
      </div>
      <div className={styles.age}>
        <h3 className={styles.age__subtitle}>Возраст</h3>
        <MultiRangeSlider
          minValue={18}
          maxValue={90}
          leftValue={leftValue}
          rightValue={rightValue}
          onChange={handleSliderChange}
        />
      </div>
      <Button
        type='button'
        variant='primary'
        className={styles.findButton}
        children={'Найти'}
        onClick={handleFindButtonClick}
      />
      <Button
        type='submit'
        variant='transparent'
        className={styles.cleanButton}
        children={'Очистить фильтр'}
        onClick={handleClearFilter}
      />
    </div>
  );
};
export default Sort;
