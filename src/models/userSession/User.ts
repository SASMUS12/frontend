import { makeObservable, observable } from "mobx";

import {Country, GenderEnum, Goal, NullEnum, UserLanguage, UserRepr} from "../../utils/openapi";


export class User {
  username: string;
  firsName: string;
  avatar: string;
  age: string;
  slug: string | null;
  country: Country;
  languages: UserLanguage[];
  gender: GenderEnum | NullEnum | null;
  goals: Goal[];
  interests: string[];
  about: string;
  lasActivity: string | null;
  iOnline: string;
  genderIsHidden: boolean;
  ageIsHidden: boolean;
  role: string;

  constructor({
                username, firsName, avatar, age, slug, country, languages, gender, goals, interests, about, lasActivity, iOnline, genderIsHidden, ageIsHidden, role
  }: UserRepr) {
    makeObservable(this, {
      username: observable,
      firsName: observable,
      avatar: observable,
      age: observable,
      slug: observable,
      country: observable,
      languages: observable,
      gender: observable,
      goals: observable,
      interests: observable,
      lasActivity: observable,
      iOnline: observable,
      genderIsHidden: observable,
      ageIsHidden: observable,
      role: observable,
    })

    this.username = username;
    this.firsName = firsName;
    this.avatar = avatar;
    this.age = age;
    this.slug = slug;
    this.country = country;
    this.languages = languages;
    this.gender = gender;
    this.goals = goals;
    this.interests = interests;
    this.lasActivity = lasActivity;
    this.iOnline = iOnline;
    this.genderIsHidden = genderIsHidden;
    this.ageIsHidden = ageIsHidden;
    this.role = role;
  }

}
