import { FC, useEffect, useState } from 'react';

import { Button } from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';

import { Country } from '../../utils/openapi';
import { api } from '../../utils/constants';

import styles from './CountrySelection.module.scss';
import classNames from 'classnames';

interface CountrySelectionProps {
  pageName: string;
  onSelectedCountriesChange: (selectedCountries: Country[]) => void;
  onClearFilter: () => void;
}

const CountrySelection: FC<CountrySelectionProps> = ({
  pageName,
  onSelectedCountriesChange,
  onClearFilter,
}) => {
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [isCountryListVisible, setCountryListVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(countriesData);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [suggestedCountries, setSuggestedCountries] = useState<Country[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<
    number | null
  >(null);
  const [lastPressedLetter, setLastPressedLetter] = useState<string | null>(
    null,
  );

  const fetchCountriesData = async () => {
    try {
      console.log('отправка запроса ---');
      const response = await api.api.countriesList();
      console.log('ответ получен -', response);
      const countries = response.data.map((country) => ({
        code: country.code,
        name: country.name,
        flag_icon: country.flag_icon,
      }));
      setCountriesData(countries);
    } catch (error) {
      console.error('Ошибка при получении данных о странах:', error);
    }
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  const i = pageName === 'Sort' ? 5 : 1;

  const handleSelectCountry = (country: Country) => {
    if (selectedCountries.length < i && !selectedCountries.includes(country)) {
      const updatedSelectedCountries = [...selectedCountries, country];
      setSelectedCountries(updatedSelectedCountries);
      setSelectedCountry(country);
      setCountryListVisible(false);
      setSearchValue('');
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
    const filtered = countriesData.filter(
      (country) =>
        country.name.toLocaleLowerCase('ru').includes(searchValueLower) &&
        !selectedCountries.includes(country),
    );
    setFilteredCountries(filtered);

    const suggested = countriesData.filter((country) =>
      country.name.toLocaleLowerCase('ru').startsWith(searchValueLower),
    );
    setSuggestedCountries(suggested);
    const firstLetter =
      searchValueLower.length > 0 ? searchValueLower.charAt(0) : null;
    setLastPressedLetter(firstLetter);

    const isInvalidSearch =
      newSearchValue.length > 0 &&
      filtered.length === 0 &&
      suggested.length === 0;
    const errorMessage = isInvalidSearch
      ? 'Страны не существует, возможно ошибка'
      : '';
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
    const updatedCountries = selectedCountries.filter(
      (c) => c.code !== country.code,
    );
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

  const sortCountriesByLastLetter = () => {
    if (lastPressedLetter) {
      return filteredCountries.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (
          nameA.startsWith(lastPressedLetter) &&
          !nameB.startsWith(lastPressedLetter)
        ) {
          return -1;
        }
        if (
          !nameA.startsWith(lastPressedLetter) &&
          nameB.startsWith(lastPressedLetter)
        ) {
          return 1;
        }
        return nameA.localeCompare(nameB);
      });
    } else {
      return filteredCountries;
    }
  };

  const handleClearFilter = () => {
    onClearFilter();
    setSearchValue('');
    setIsError(false);
    setErrorMessage('');
    setSelectedCountry(null);
    setSuggestedCountries([]);
    setSelectedSuggestionIndex(null);
    setLastPressedLetter(null);
  };

  const handleSelectCountryFromList = (countryName: string) => {
    const selectedCountry = countriesData.find(
      (country) => country.name.toLocaleLowerCase('ru') === countryName,
    );
    if (selectedCountry) {
      handleSelectCountry(selectedCountry);
    }
  };

  return (
    <div className={styles.country}>
      <Input
        className={`${styles.country__input}
        ${isCountryListVisible ? styles.country__input_showSuggestions : ''}
        `}
        type='search'
        name='country'
        value={searchValue}
        fontSize={pageName === 'FillOutProfile2' ? '16' : '14'}
        isLabelHintHidden={true}
        placeholder='Начните вводить название'
        onValue={(event) => handleSearchInputChange(event)}
        onKeyDown={handleKeyDown}
      />
      {isError && (
        <span className={styles.country__input_error}>{errorMessage}</span>
      )}
      <div className={styles.country__selectedCountries}>
        {selectedCountries.map((country) => (
          <div key={country.code} className={styles.country__selectCountry}>
            <span className={styles.country__countryName}>{country.name}</span>
            <Button
              className={styles.country__removeButton}
              onClick={() => handleRemoveCountry(country)}
            />
          </div>
        ))}
        {isCountryListVisible && (
          <div
            className={classNames(styles.country__countryList, {
              [styles.country__countryList_visible]:
                sortCountriesByLastLetter().length > 0,
            })}
            onKeyDown={handleDropdownKeyDown}
          >
            {sortCountriesByLastLetter().map((country) =>
              country && country.name ? (
                <div
                  key={country.code}
                  onClick={() =>
                    handleSelectCountryFromList(
                      country.name.toLocaleLowerCase('ru'),
                    )
                  }
                  className={classNames(styles.country__countryList_option, {
                    [styles.selected]: selectedCountry?.code === country.code,
                    [styles.suggested]: suggestedCountries.includes(country),
                  })}
                >
                  <img
                    src={country.flag_icon}
                    alt={`${country.name} Flag`}
                    className={styles.country__countryList_flagImage}
                  />
                  {country.name}
                </div>
              ) : null,
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountrySelection;
