import { Interest, PaginatedInterestList } from '../openapi';
import { api } from '../constants';

export const getInterests = async (): Promise<PaginatedInterestList> => {
  const { data: interests, error } = await api.api.interestsList();

  if (error) {
    throw error;
  }

  const interestList: Interest[] | undefined = interests.results;

  if (interestList) {
  }

  return interestList.map((interest) => ({
    name: interest.name as string,
    sorting: interest.sorting as string,
  }));
};

export const getInterests = async (): Promise<PaginatedInterestList> => {
  const { data: interests, error } = await api.api.interestsList();

  if (error) {
    throw error;
  }

  const interestList: Interest[] | undefined = interests.results;

  if (interestList) {
  }

  return interestList.map((interest) => ({
    name: interest.name as string,
    sorting: interest.sorting as string,
  }));
};
