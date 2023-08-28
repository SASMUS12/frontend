import { Interest } from '../openapi';
import { api } from '../constants';

export const getInterests = async (): Promise<Interest[]> => {
  const { data: interests, error } = await api.api.interestsList();

  if (error) {
    throw error;
  }

  if (interests) {
    const interestList = interests.results;

    if (interestList) {
      return interestList.map((result) => ({
        name: result.name as string,
        sorting: result.sorting as string,
      }));
    }
  }

  return [];
};
