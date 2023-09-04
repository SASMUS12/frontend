import { Country } from '../openapi';
import { api } from '../constants';

export const getCountries = async (): Promise<Country[]> => {
  const { data: countries, error } = await api.api.countriesList();

  if (error) {
    throw error;
  }

  if (countries) {
    return countries.map((country) => ({
      code: country.code as string | null,
      name: country.name as string,
      flag_icon: country.flag_icon as string,
    }));
  }

  return [];
};
