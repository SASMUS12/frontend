import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import InputSearchList from '../InputSearchList/InputSearchList';

import { Country } from '../../utils/openapi';
import { api } from '../../utils/constants';

interface EditCountriesSelectionProps {
  pageName: string;
  selectedCountries: Country[];
  setSelectedCountries: (countries: Country[]) => void;
  inputValue: any;
  handleInputValue: (event: any) => void;
}

const EditCountriesSelection = ({
  pageName,
  selectedCountries,
  setSelectedCountries,
  inputValue,
  handleInputValue,
}: EditCountriesSelectionProps) => {
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

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

  const handleSearchInputChange = (event) => {
    handleInputValue(event);
    const newSearchValue = event.value;
    setSearchValue(newSearchValue);
  };

  return (
    <InputSearchList
      pageName={pageName}
      data='countries'
      dataList={countriesData}
      inputValue={inputValue}
      handleSearchInputChange={handleSearchInputChange}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      selectedItems={selectedCountries}
      setSelectedItems={setSelectedCountries}
    />
  );
};

export default observer(EditCountriesSelection);
