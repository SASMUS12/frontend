import React, { useState } from "react";

import styles from "../Sort/Sort.module.scss";

import LanguageLevel from "../LanguageLevel/LanguageLevel";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import { Button } from "../UI/Button/Button";
import { Language } from '../../utils/openapi';
import { Country } from '../../utils/openapi';
import classNames from 'classnames';

interface SortProps {
  value: any;
  onChangeSort: (sortType: any) => void;
  isOpen: boolean;
  languagesData: Language[];
  countriesData: Country[];
}

const Sort: React.FC<SortProps> = ({ value, onChangeSort, isOpen, languagesData, countriesData }) => {
  const [leftValue, setLeftValue] = useState<number>(18);
  const [rightValue, setRightValue] = useState<number>(40);
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countriesData);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [lastPressedLetter, setLastPressedLetter] = useState<string | null>(null);

  // Функция для обработки выбора страны
  const handleSelectCountry = (country: Country) => {
    if (selectedCountries.length < 5 && !selectedCountries.includes(country)) {
      setSelectedCountries([...selectedCountries, country]);
      setSelectedCountry(country); // Фиксируем выбранную страну в состоянии selectedCountry
      setSearchValue('');
    }
  };

  // Функция для удаления выбранной страны
  const handleRemoveCountry = (country: Country) => {
    const updatedCountries = selectedCountries.filter((c) => c.code !== country.code);
    setSelectedCountries(updatedCountries);
  };

  // Функция для обработки нажатия клавиши Enter в поле поиска
  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && selectedCountry) {
      handleSelectCountry(selectedCountry);
    }
  };

  // Функция для отображения выбранных стран
  const getSelectedCountryNames = () => {
    if (selectedCountries.length > 0) {
      return selectedCountries.map((country) => (
        <div key={country.code} className={styles.popup__selectedCountry}>
          <span className={styles.popup__countryName}>{country.name}</span>
          <Button
            className={styles.popup__removeButton}
            onClick={() => handleRemoveCountry(country)}
          />
        </div>
      ));
    } else {
      return null;
    }
  };

  const handleGenderSelection = (gender: string) => {
    setSelectedGender(gender);
  };

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
    const updatedLanguages = selectedLanguages.filter((lang) => lang.isocode !== language.isocode);
    setSelectedLanguages(updatedLanguages);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = countriesData.filter((country) =>
      country.name.toLowerCase().includes(searchValue)
    );
    setFilteredCountries(filtered);
    setSearchValue(e.target.value);

     // Получаем первую букву из введенного значения
    const firstLetter = searchValue.length > 0 ? searchValue.charAt(0) : null;
    setLastPressedLetter(firstLetter);
  };

  // Очистка фильтра
  const handleClearFilter = () => {
    setSelectedLanguages([]);
    setLeftValue(18);
    setRightValue(40);
    setSearchValue('');
    setSelectedCountry(null);
    setSelectedCountries([]);
    setLastPressedLetter(null); 
  };

  // Функция для сортировки списка стран по последней нажатой букве
  const sortCountriesByLastLetter = () => {
    if (lastPressedLetter) {
      return filteredCountries.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA.startsWith(lastPressedLetter) && !nameB.startsWith(lastPressedLetter)) {
          return -1;
        }
        if (!nameA.startsWith(lastPressedLetter) && nameB.startsWith(lastPressedLetter)) {
          return 1;
        }
        return nameA.localeCompare(nameB);
      });
    } else {
      return filteredCountries;
    }
  };


  // Функция запуска фильтрации и передачи ее в родительский компонент
  const handleFindButtonClick = () => {
    const filters = {
      languages: selectedLanguages,
      gender: selectedGender,
      age: {
        min: leftValue,
        max: rightValue,
      },
      country: selectedCountries,
    };
    onChangeSort(filters);
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
            onKeyDown={handleEnterPress}
          />
          <div className={styles.popup__selectedCountriesContainer}>
            {getSelectedCountryNames()}
          </div>
          {sortCountriesByLastLetter().map((country) => (
            <div
              key={country.code}
              onClick={() => handleSelectCountry(country)}
              className={classNames(styles.popup__countryOption, {
                [styles.selected]: selectedCountry?.code === country.code,
              })}
            >
              {country.name}
            </div>
          ))}
          <Button
            onClick={handleOpenLanguageMenu}
            className={styles.popup__languageButton}
          >
            {selectedLanguage ? selectedLanguage.name : ""}
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
        >
          {"добавить язык"}
        </Button>
      </div>
      <div className={styles.popup__partner}>
        <h2>О партнере</h2>
        <div className={styles.popup__gender}>
          <h3>Пол</h3>
          <Button
            children={"Мужчина"}
            onClick={() => handleGenderSelection('Мужчина')}
            className={selectedGender === 'Мужчина' ? styles.selected : ''}
          />
          <Button
            children={"Женщина"}
            onClick={() => handleGenderSelection('Женщина')}
            className={selectedGender === 'Женщина' ? styles.selected : ''}
          />
        </div>
      </div>
      <div className={styles.popup__age}>
        <h3>Возраст</h3>
        <MultiRangeSlider
          minValue={18}
          maxValue={90}
          leftValue={leftValue}
          rightValue={rightValue}
          onChange={handleSliderChange}
        />
      </div>
      <Button
        className={styles.popup__findButton}
        children={"Найти"}
        onClick={handleFindButtonClick}
      />
      <Button
        className={styles.popup__cleanButton}
        children={"Очистить фильтр"}
        onClick={handleClearFilter}
      />
    </div>
  );
};

export default Sort;