import { Language } from '../openapi';
import { api } from '../constants';

export const getLanguages = async (): Promise<Language[]> => {
  const { data: languages, error } = await api.api.languagesList();

  if (error) {
    throw error;
  }

  if (languages) {
    return languages.map((language) => ({
      name: language.name as string,
      name_local: language.name_local as string,
      isocode: language.isocode as string,
      sorting: language.sorting as number,
    }));
  }

  return [];
};
