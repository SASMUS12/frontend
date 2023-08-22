import React, { useState } from "react";
import classNames from 'classnames';
import { Button } from "../UI/Button/Button";
import { Country } from '../../utils/openapi';
import styles from "../CountrySelection/CountrySelection.module.scss";

interface CountrySelectionProps {
    countriesData: Country[];
    onSelectedCountriesChange: (selectedCountries: Country[]) => void;
    onSortCountry: (country: Country) => void;
  }
  

const CountrySelection: React.FC<CountrySelectionProps> = ({
    countriesData,//принимает список стран с сервера
    onSelectedCountriesChange,//Обработчик изменения выбранных стран
    onSortCountry,//Обработчик сортировки стран
  }) => {
    const [isCountryListVisible, setCountryListVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>(countriesData);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [suggestedCountries, setSuggestedCountries] = useState<Country[]>([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number | null>(null);
    const [lastPressedLetter, setLastPressedLetter] = useState<string | null>(null);

    const handleSelectCountry = (country: Country) => {
        if (selectedCountry && !selectedCountries.includes(country)) {
          const updatedSelectedCountries = [...selectedCountries, country];
          setSelectedCountries(updatedSelectedCountries);
          setSelectedCountry(country);
          setCountryListVisible(false);
          setSearchValue('');
          onSortCountry(country);
          onSelectedCountriesChange(updatedSelectedCountries);
        }
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleRemoveCountry = (country: Country) => {
        const updatedCountries = selectedCountries.filter((c) => c.code !== country.code);
        setSelectedCountries(updatedCountries);
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


    const handleSelectCountryFromList = (countryName: string) => {
        const selectedCountry = countriesData.find(country => country.name.toLocaleLowerCase('ru') === countryName);
        if (selectedCountry) {
        handleSelectCountry(selectedCountry);
        }
    };

    return (
        <div className={styles.cantry}>
          <input
            type="text"
            id="searchInput"
            placeholder="Начните вводить название"
            value={searchValue}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            className={`${styles.cantry__input} ${isCountryListVisible ? styles.cantry__input_showSuggestions : ''}`}
          />
          {isError && (
            <span className={styles.cantry__input_error}>{errorMessage}</span>
          )}
          <div className={styles.cantry__selectedCountries}>
            {selectedCountries.map((country) => (
              <div key={country.code} className={styles.cantry__selectCountry}>
                <span className={styles.cantry__countryName}>{country.name}</span>
                <Button
                  className={styles.cantry__removeButton}
                  onClick={() => handleRemoveCountry(country)}
                />
              </div>
            ))}
            {isCountryListVisible && (
              <div className={classNames(styles.cantry__countryList, {
                [styles.cantry__countryList_visible]: sortCountriesByLastLetter().length > 0,
              })}
                onKeyDown={handleDropdownKeyDown}
              >
                {sortCountriesByLastLetter().map((country) => (
                  country && country.name ? (
                    <div
                      key={country.code}
                      onClick={() => handleSelectCountryFromList(country.name.toLocaleLowerCase('ru'))}
                      className={classNames(styles.cantry__countryList_option, {
                        [styles.selected]: selectedCountry?.code === country.code,
                        [styles.suggested]: suggestedCountries.includes(country),
                      })}
                    >
                      <img
                        src={country.flag_icon}
                        alt={`${country.name} Flag`}
                        className={styles.cantry__countryList_flagImage}
                      />
                      {country.name}
                    </div>
                  ) : null
                ))}
              </div>
            )}
          </div>
        </div>
      );
    };
    
    export default CountrySelection; 