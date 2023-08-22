import React, { useState, useMemo  } from "react";

import styles from "../Sort/Sort.module.scss";
import CountrySelection from "../CountrySelection/CountrySelection";
import LanguageLevel from "../LanguageLevel/LanguageLevel";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import { Button } from "../UI/Button/Button";
import { Country, Language, SkillLevelEnum } from '../../utils/openapi';
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
  
  //добавления языка и уровня

   const initialLanguageAndLevels = useMemo(() => {
    return { language: null, skillLevels: [] };
  }, []);

  const [selectedLanguagesAndLevels, setSelectedLanguagesAndLevels] = useState<
    { language: Language | null; skillLevels: SkillLevelEnum[] }[]
  >([initialLanguageAndLevels]);

  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedSkillLevels, setSelectedSkillLevels] = useState<SkillLevelEnum[]>([]);

  const [isCountryListVisible, setCountryListVisible] = useState(false);
 
  const [searchValue, setSearchValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countriesData);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  
  const [lastPressedLetter, setLastPressedLetter] = useState<string | null>(null);
  const [suggestedCountries, setSuggestedCountries] = useState<Country[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number | null>(null);
  
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

  const handleAddLanguageAndLevel = (language: Language, skillLevels: SkillLevelEnum[]) => {
    const existingLanguageIndex = selectedLanguagesAndLevels.findIndex(
      lang => lang.language?.isocode === language.isocode
    );

    if (existingLanguageIndex === -1) {
      setSelectedLanguagesAndLevels([...selectedLanguagesAndLevels, { language, skillLevels }]);
    } else {
      const updatedLanguagesAndLevels = [...selectedLanguagesAndLevels];
      updatedLanguagesAndLevels[existingLanguageIndex].skillLevels = skillLevels;
      setSelectedLanguagesAndLevels(updatedLanguagesAndLevels);
    }
  };
  

  const handleRemoveLanguage = (index: number) => {
    setSelectedLanguagesAndLevels((prevLanguages) => {
      const updatedLanguages = [...prevLanguages];
      updatedLanguages.splice(index, 1);
      return updatedLanguages;
    });
  };

  const handleClearFilter = () => {
    setSelectedLanguage(null);
    setSelectedSkillLevels([]);
    setSelectedCountry(null);
    setSelectedCountries([]);
    setLastPressedLetter(null);
    setSelectedLanguagesAndLevels([initialLanguageAndLevels]);

    selectedLanguagesAndLevels.forEach(item => {
      item.language = null;
      item.skillLevels = [];
    });

    setSelectedLanguagesAndLevels([...selectedLanguagesAndLevels]);
    
    setLeftValue(18);
    setRightValue(40);
    setSearchValue('');
  };

  const popularCountryCodes = ['cn', 'es', 'england', 'sa', 'bd', 'pt', 'ru', 'jp', 'pc', 'my'];

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


  const handleFindButtonClick = () => {
    if (leftValue <= rightValue) {
    const countryCodes = selectedCountries.map(country => country.code).join(',');

    const filters: Filters = {
      country: countryCodes,
      native_languages: '', // Обновите это значение на основе вашей логики
      foreign_languages: selectedLanguage
        ? [{ language: selectedLanguage.isocode, skill_level: selectedSkillLevels[0] }] // Измените это в соответствии с вашей логикой
        : [],
      gender: selectedGender,
      age: `${leftValue},${rightValue}`,
    };

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
        <CountrySelection
          countriesData={countriesData}
          onSelectedCountriesChange={getSelectedCountryNames}
          onSortCountry={handleSelectCountry}
      />
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
      </div>
      {selectedLanguagesAndLevels.map((item, index) => (
        <LanguageLevel
          key={index}
          languages={languagesData}
          selectedLanguage={item.language}
          initialLanguageAndLevels={initialLanguageAndLevels}
          selectedSkillLevels={item.skillLevels}
          onLanguageChange={(language) => {
            const updatedLanguagesAndLevels = [...selectedLanguagesAndLevels];
            updatedLanguagesAndLevels[index].language = language;
            setSelectedLanguagesAndLevels(updatedLanguagesAndLevels);
          }}
          onSkillLevelsChange={(skillLevels) => {
            const updatedLanguagesAndLevels = [...selectedLanguagesAndLevels];
            updatedLanguagesAndLevels[index].skillLevels = skillLevels;
            setSelectedLanguagesAndLevels(updatedLanguagesAndLevels);
          }}
          onReset={() => {
            const updatedLanguagesAndLevels = [...selectedLanguagesAndLevels];
            updatedLanguagesAndLevels[index].language = null;
            updatedLanguagesAndLevels[index].skillLevels = [];
            setSelectedLanguagesAndLevels(updatedLanguagesAndLevels);
          }}
          onRemoveLanguage={() => handleRemoveLanguage(index)}
        />
      ))}
      {selectedLanguagesAndLevels.length < 3 && (
        <div className={styles.languagesAdd}>
          <Button
            onClick={() => {
              const updatedLanguagesAndLevels = [...selectedLanguagesAndLevels];
              updatedLanguagesAndLevels.push({ language: null, skillLevels: [] });
              setSelectedLanguagesAndLevels(updatedLanguagesAndLevels);
            }}
            className={styles.languagesAdd__button}
          >
            {"добавить язык"}
          </Button>
        </div>
      )}
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