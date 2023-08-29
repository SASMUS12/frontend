import { makeObservable, observable } from 'mobx';

import {
  Country,
  GenderEnum,
  Goal,
  NullEnum,
  UserLanguage,
} from '../../utils/openapi';

export interface UserInterface {
  first_name?: string;
  avatar?: string | null;
  country?: Country | null;
  birth_date?: string | null;
  languages?: UserLanguage[];
  gender?: GenderEnum | NullEnum | null;
  goals?: Goal[];
  interests?: string[];
  about?: string;
}

export class User {
  first_name?: string;
  avatar?: string | null;
  country?: Country | null;
  birth_date?: string | null;
  languages?: UserLanguage[];
  gender?: GenderEnum | NullEnum | null;
  goals?: Goal[];
  interests?: string[];
  about?: string;

  constructor({
    first_name,
    avatar,
    country,
    birth_date,
    languages,
    gender,
    goals,
    interests,
    about,
  }: UserInterface) {
    makeObservable(this, {
      first_name: observable,
      avatar: observable,
      country: observable,
      birth_date: observable,
      languages: observable,
      gender: observable,
      goals: observable,
      interests: observable,
      about: observable,
    });

    this.first_name = first_name;
    this.avatar = avatar;
    this.country = country;
    this.birth_date = birth_date;
    this.languages = languages;
    this.gender = gender;
    this.goals = goals;
    this.interests = interests;
    this.about = about;
  }
}
