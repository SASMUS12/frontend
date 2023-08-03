import React, { useState } from "react";
import styles from "../Sort/Sort.module.scss";
import LanguageLevel, { Language } from "../LanguageLevel/LanguageLevel";
import { Button } from "../UI/Button/Button";
import plus from '../../images/svg/plus-in-circle.svg';
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";


export interface Country {
  code: string;
  name: string;
}

interface SortProps {
  value: any;
  onChangeSort: (sortType: any) => void;
  isOpen: boolean;
  languagesData: Language[];
  countriesData: {
    code: string;
    name: string;
  }[];
}

const Sort: React.FC<SortProps> = ({ value, onChangeSort, isOpen, languagesData, countriesData }) => {
  const [leftValue, setLeftValue] = useState<number>(18);
  const [rightValue, setRightValue] = useState<number>(40);
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countriesData);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleSliderChange = (left: number, right: number) => {
    setLeftValue(left);
    setRightValue(right);
  };

  const handleOpenLanguageMenu = () => {
    setLanguageMenuOpen(true);
  };

  const handleCloseLanguageMenu = () => {
    setLanguageMenuOpen(false);
  };

  const handleAddLanguage = (language: Language) => {
    setSelectedLanguages([...selectedLanguages, language]);
    setLanguageMenuOpen(false);
  };

  const handleRemoveLanguage = (language: Language) => {
    const updatedLanguages = selectedLanguages.filter((lang) => lang.id !== language.id);
    setSelectedLanguages(updatedLanguages);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = countriesData.filter((country) =>
      country.name.toLowerCase().includes(searchValue)
    );
    setFilteredCountries(filtered);
    setSearchValue(e.target.value);
  };

 
  return (
    <div className={isOpen ? styles.popup__sort : styles.popup__sort_hidden}>
      <div className={styles.popup__cantry}>
        <h2>Страна партнера</h2>
        <div className={styles.popup__enter}>
          <input
            type="text"
            id="searchInput"
            placeholder="Начните вводить название"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
          {filteredCountries.map((country) => (
            <div key={country.code}>{country.name}</div>
          ))}
          <Button onClick={handleOpenLanguageMenu} className={styles.popup__languageButton}>
            {selectedLanguage ? selectedLanguage.name : "Выберите язык"}
          </Button>
        </div>
      </div>
      <h2>Язык партнера</h2>
      <LanguageLevel
        languages={languagesData}
        onAdd={handleAddLanguage}
        onRemove={handleRemoveLanguage}
      />
      {selectedLanguages.map((language, index) => (
        <LanguageLevel
          key={index}
          languages={languagesData}
          onAdd={handleAddLanguage}
          onRemove={handleRemoveLanguage}
        />
      ))}
      {isLanguageMenuOpen && (
        <LanguageLevel languages={languagesData} onAdd={handleAddLanguage} />
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
      <Button
        className={styles.popup__cleanButton}
        children={"Очистить фильтр"}
      />
    </div>
  );
};

export default Sort;
