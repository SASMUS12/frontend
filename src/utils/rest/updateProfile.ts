import { Country, GenderEnum, Goal, NullEnum, UserLanguage } from '../openapi';
import { api } from '../constants';
import { store } from '../../models/store';

export const updateProfile = async ({
  first_name,
  avatar,
  country,
  birth_date,
  languages,
  gender,
  goals,
  interests,
  about,
}: {
  first_name?: string;
  avatar?: string | null;
  country?: Country;
  birth_date?: string | null;
  languages?: UserLanguage[];
  gender?: GenderEnum | NullEnum | null;
  goals?: Goal[];
  interests?: string[];
  about?: string;
}) => {
  try {
    if (!store.session.user) {
      return;
    }

    const user = store.session.user;

    await api.api.usersMePartialUpdate({
      first_name,
      avatar: avatar as File | null,
      country: country as string | null | undefined,
      birth_date,
      languages,
      gender,
      goals: goals as string[] | undefined,
      interests,
      about,
    });

    store.session.updateUser({
      ...user,
      first_name,
      avatar,
      country,
      birth_date,
      languages,
      gender,
      goals,
      interests,
      about,
    });
  } catch (error) {
    console.log('features.updateProfile', error);
  }
};
