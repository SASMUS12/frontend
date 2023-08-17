import React, { useState } from "react";

import styles from "../Sort/Sort.module.scss";

import LanguageLevel from "../LanguageLevel/LanguageLevel";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import { Button } from "../UI/Button/Button";
import { Country, Language, UserForeignLanguage, UserNativeLanguage, SkillLevelEnum } from '../../utils/openapi';
import classNames from 'classnames';

type Filters = {
  native_languages: string;
  foreign_languages: {
    language: string;
    skill_level: SkillLevelEnum;
  }[];
  gender: string | null;
  age: string;
  country: string;
};

interface SortProps {
  value: any;
  onChangeSort: (sortType: any) => void;
  isOpen: boolean;
  languagesData: Language[];
  countriesData: Country[];
}



const Sort: React.FC<SortProps> = ({ onChangeSort, isOpen, languagesData, countriesData }) => {
  const [leftValue, setLeftValue] = useState<number>(18);
  const [rightValue, setRightValue] = useState<number>(40);
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [isCountryListVisible, setCountryListVisible] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);

  const [searchValue, setSearchValue] = useState('');
  const [isError, setIsError] = useState(false); // Новое состояние для ошибки
  const [errorMessage, setErrorMessage] = useState(''); // Сообщение об ошибке

  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countriesData);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [lastPressedLetter, setLastPressedLetter] = useState<string | null>(null);
  const [suggestedCountries, setSuggestedCountries] = useState<Country[]>([]);// Создание состояние для хранения списка подсказок
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number | null>(null); // Cостояние для отслеживания выбранной подсказки
  const [filterCleared, setFilterCleared] = useState(false);//состояние очистки в компоненте LanguageLevel
  
  // Функция для обработки выбора страны
  const handleSelectCountry = (country: Country) => {
    if (selectedCountries.length < 5 && !selectedCountries.includes(country)) {
      setSelectedCountries([...selectedCountries, country]);
      setSelectedCountry(country);
      setCountryListVisible(false);
      setSearchValue('');
      console.log(country)
    }
  };

  // Функция для удаления выбранной страны
  const handleRemoveCountry = (country: Country) => {
    const updatedCountries = selectedCountries.filter((c) => c.code !== country.code);
    setSelectedCountries(updatedCountries);
  };

  // Функция для отображения выбранных стран
  const getSelectedCountryNames = () => {
    if (selectedCountries.length > 0) {
      return selectedCountries.map((country) => (
        <div key={country.code} className={styles.popup__cantry_selectCountry}>
          <span className={styles.popup__cantry_countryName}>{country.name}</span>
          <Button
            className={styles.popup__cantry_removeButton}
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

  // Функция для добавления выбранного языка в список и закрытия меню выбора языков
  const handleAddLanguage = (language: UserForeignLanguage | UserNativeLanguage) => {
  console.log("Вызвана функция handleAddLanguage");

  // Преобразование выбранного языка в формат Language для добавления в список
  const convertedLanguage: Language = {
    isocode: language.isocode,
    name: language.language,
    name_local: language.language,
    sorting: 0,
  };

  // Добавление преобразованного языка в список выбранных языков
  setSelectedLanguages(prevLanguages => [...prevLanguages, convertedLanguage]);

  // Закрытие меню выбора языков
  setLanguageMenuOpen(false);

  console.log("Выбранный язык:", language);
  };

  // Функция для удаления выбранного языка из списка
  const handleRemoveLanguage = (language: UserForeignLanguage | UserNativeLanguage) => {
  // Удаление выбранного языка из списка выбранных языков
  setSelectedLanguages(prevLanguages =>
    prevLanguages.filter(lang => (lang as Language).isocode !== language.isocode)
    );
  };

  
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleSearchInputChange called');
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);

    if (newSearchValue) {
      setCountryListVisible(true);
    } else {
      setCountryListVisible(false);
    }

    const searchValueLower = newSearchValue.toLocaleLowerCase('ru');
    const filtered = countriesData.filter((country) =>
      country.name.toLocaleLowerCase('ru').includes(searchValueLower) && !selectedCountries.includes(country)
    );
     setFilteredCountries(filtered);

    const suggested = countriesData.filter((country) =>
    country.name.toLocaleLowerCase('ru').startsWith(searchValueLower)
    );
      setSuggestedCountries(suggested);

    
    const firstLetter = searchValueLower.length > 0 ? searchValueLower.charAt(0) : null;
      setLastPressedLetter(firstLetter);

    const isInvalidSearch = newSearchValue.length > 0 && filtered.length === 0 && suggested.length === 0;
    const errorMessage = isInvalidSearch ? 'Страны не существует, возможно ошибка' : '';
    setIsError(isInvalidSearch);
    setErrorMessage(errorMessage);
    
    setCountryListVisible(filtered.length > 0 && newSearchValue.length > 0);

    setSelectedSuggestionIndex(null);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => {
        if (prevIndex === null) {
          return 0;
        } else if (prevIndex < suggestedCountries.length - 1) {
          return prevIndex + 1;
        } else {
          return prevIndex;
        }
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => {
        if (prevIndex === null) {
          return suggestedCountries.length - 1;
        } else if (prevIndex > 0) {
          return prevIndex - 1;
        } else {
          return prevIndex;
        }
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedSuggestionIndex !== null) {
        handleSelectCountry(suggestedCountries[selectedSuggestionIndex]);
      } else if (selectedCountry) {
        handleSelectCountry(selectedCountry);
      }
    }
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => {
        if (prevIndex === null) {
          return 0;
        } else if (prevIndex < suggestedCountries.length - 1) {
          return prevIndex + 1;
        } else {
          return prevIndex;
        }
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) => {
        if (prevIndex === null) {
          return suggestedCountries.length - 1;
        } else if (prevIndex > 0) {
          return prevIndex - 1;
        } else {
          return prevIndex;
        }
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedSuggestionIndex !== null) {
        handleSelectCountry(suggestedCountries[selectedSuggestionIndex]);
      } else if (selectedCountry) {
        handleSelectCountry(selectedCountry);
      }
    }
  };
  
  const handleSelectCountryFromList = (countryName: string) => {
    const selectedCountry = countriesData.find(country => country.name.toLocaleLowerCase('ru') === countryName);
    if (selectedCountry) {
      handleSelectCountry(selectedCountry as Country);
    }
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
    setFilterCleared(true);
  };

  const handleLanguageLevelClearFilter = () => {
    setFilterCleared(false);
    console.log("Clearing LanguageLevel filter");
  };

  //массив с кодами популярных языков
  const popularCountryCodes = ['cn', 'es', 'england', 'sa', 'bd', 'pt', 'ru', 'jp', 'pc', 'my'];

  // Функция для сортировки списка стран по последней нажатой букве
  const sortCountriesByLastLetter = () => {
    if (lastPressedLetter) {
      const popularCountries = filteredCountries.filter(country => popularCountryCodes.includes(country.name));
      const otherCountries = filteredCountries.filter(country => !popularCountryCodes.includes(country.name));
  
      popularCountries.sort((a, b) => a.name.localeCompare(b.name));
      otherCountries.sort((a, b) => a.name.localeCompare(b.name));
  
      return [...popularCountries, ...otherCountries].sort((a, b) => {
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
    // Проверка, что начальный возраст меньше или равен конечному возрасту
    if (leftValue <= rightValue) {
    // Создание строки с кодами выбранных стран, разделенных запятыми
    const countryCodes = selectedCountries.map(country => country.code).join(',');

    // Создание строки с названиями выбранных родных языков, разделенных запятыми
    const nativeLanguages = selectedLanguages
      .filter(language => !('skill_level' in language))
      .map(language => language.name)
      .join(',');

    // Создание массива объектов с выбранными иностранными языками и их уровнем владения
    const foreignLanguages = selectedLanguages
      .filter(language => 'skill_level' in language)
      .map(language => {
        if ('language' in language && 'skill_level' in language) {
          const userForeignLanguage = language as UserForeignLanguage;
          return {
            language: userForeignLanguage.language,
            skill_level: userForeignLanguage.skill_level as SkillLevelEnum,
          };
        }
        return null;
      })
      .filter(language => language !== null) as { language: string; skill_level: SkillLevelEnum}[];

    // Формирование объекта с фильтрами для запроса
    const filters: Filters = {
      country: countryCodes,
      native_languages: nativeLanguages,
      foreign_languages: foreignLanguages,
      gender: selectedGender,
      age: `${leftValue},${rightValue}`,
    };

    // Вызов функции для передачи параметров сортировки
    onChangeSort(filters);

    // Вывод параметров запроса в консоль для проверки
    console.log(filters);
  } else {
    console.log('Ошибка: начальный возраст должен быть меньше или равен конечному возрасту.');
  }
  };
 
  return (
    <div className={isOpen ? styles.popup__sort : styles.popup__sort_hidden}>
      <div className={styles.popup__cantry}>
        <h2 className={styles.subtitle}>Страна партнера</h2>
        <div className={styles.popup__cantry_enter}>
          <input
            type="text"
            id="searchInput"
            placeholder="Начните вводить название"
            value={searchValue}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            className={`${styles.popup__cantry_input} ${isCountryListVisible ? styles.popup__cantry_input_showSuggestions : ''}`}
          />
          {isError && (
          <span className={styles.popup__cantry_input_error}>{errorMessage}</span>
        )}
          <div className={styles.popup__cantry_selectedCountries}>
            {getSelectedCountryNames()}
            {isCountryListVisible && (
              <div className={classNames(styles.popup__cantry_countryList, {
                [styles.popup__cantry_countryList_visible]: sortCountriesByLastLetter().length > 0,
              })}
              onKeyDown={handleDropdownKeyDown}
              >
              {sortCountriesByLastLetter().map((country) => (
                country && country.name ? (
                <div
                  key={country.code}
                  onClick={() => handleSelectCountryFromList(country.name.toLocaleLowerCase('ru'))}
                  className={classNames(styles.popup__cantry_countryList_option, {
                    [styles.selected]: selectedCountry?.code === country.code,
                    [styles.suggested]: suggestedCountries.includes(country),
                    [styles.popular]: popularCountryCodes.includes(country.name),
                  })}
                >
                  <img
                    src={country.flag_icon}
                    alt={`${country.name} Flag`}
                    className={styles.popup__cantry_countryList_flagImage}
                  />
                  {country.name}
                </div>
              ) : null
            ))}
             </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.languageHelp}>
        <h2 className={styles.subtitle}>Язык партнера</h2>
        <Button
          className={styles.languageHelp__button}
        />
      </div>
      <LanguageLevel
        languages={languagesData}
        onAdd={handleAddLanguage}
        onRemove={handleRemoveLanguage}
        onClearFilter={handleLanguageLevelClearFilter}
      />
      {selectedLanguages.map((language, index) => (
        <LanguageLevel
          key={index}
          languages={languagesData}
          onAdd={handleAddLanguage}
          onRemove={handleRemoveLanguage}
          onClearFilter={handleLanguageLevelClearFilter}
        />
      ))}
      {isLanguageMenuOpen && (
        <LanguageLevel
        languages={languagesData}
        onAdd={handleAddLanguage}
        onClearFilter={handleLanguageLevelClearFilter} />
      )}
      <div className={styles.languagesAdd}>
        <Button
          onClick={handleOpenLanguageMenu}
          className={styles.languagesAdd__button}
        >
          {"добавить язык"}
        </Button>
      </div>
      <div className={styles.partner}>
        <h2 className={styles.subtitle}>О партнере</h2>
        <div className={styles.partner__gender}>
          <h3 className={styles.partner__gender_subtitle}>Пол</h3>
          <Button
            type="button"
            variant="transparent"
            children={"Мужчина"}
            onClick={() => handleGenderSelection('Male')}
            className={`${styles.partner__gender_button} ${selectedGender === 'Male' ? styles.selected : ''}`}
          />
          <Button
            type="button"
            variant="transparent"
            children={"Женщина"}
            onClick={() => handleGenderSelection('Female')}
            className={`${styles.partner__gender_button} ${selectedGender === 'Female' ? styles.selected : ''}`}
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
        type="button"
        variant="primary"
        className={styles.findButton}
        children={"Найти"}
        onClick={handleFindButtonClick}
      />
      <Button
        type="submit"
        variant="transparent"
        className={styles.cleanButton}
        children={"Очистить фильтр"}
        onClick={handleClearFilter}
      />
    </div>
  );
};

export default Sort;