import { makeObservable, observable } from 'mobx';

import {
  Country,
  GenderEnum,
  Goal,
  NullEnum,
  UserLanguage,
  UserRepr,
} from '../../utils/openapi';

export class User {
  username: string;
  first_name: string;
  avatar: string;
  age: string;
  slug: string | null;
  country: Country;
  languages: UserLanguage[];
  gender: GenderEnum | NullEnum | null;
  goals: Goal[];
  interests: string[];
  about: string;
  last_activity: string | null;
  is_online: string;
  gender_is_hidden: boolean;
  age_is_hidden: boolean;
  role: string;

  constructor({
    username,
    first_name,
    avatar,
    age,
    slug,
    country,
    languages,
    gender,
    goals,
    interests,
    about,
    last_activity,
    is_online,
    gender_is_hidden,
    age_is_hidden,
    role,
  }: UserRepr) {
    makeObservable(this, {
      username: observable,
      first_name: observable,
      avatar: observable,
      age: observable,
      slug: observable,
      country: observable,
      languages: observable,
      gender: observable,
      goals: observable,
      interests: observable,
      about: observable,
      last_activity: observable,
      is_online: observable,
      gender_is_hidden: observable,
      age_is_hidden: observable,
      role: observable,
    });

    this.username = username;
    this.first_name = first_name;
    this.avatar = avatar;
    this.age = age;
    this.slug = slug;
    this.country = country;
    this.languages = languages;
    this.gender = gender;
    this.goals = goals;
    this.interests = interests;
    this.about = about;
    this.last_activity = last_activity;
    this.is_online = is_online;
    this.gender_is_hidden = gender_is_hidden;
    this.age_is_hidden = age_is_hidden;
    this.role = role;
  }
}
