import { GenderEnum, NullEnum, UserLanguage } from "../openapi";
import { api, headersWithToken as headers } from "../constants";
import { store } from "../../models/store";

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
  country?: string | null;
  birth_date?: string | null;
  languages?: UserLanguage[];
  gender?: GenderEnum | NullEnum | null;
  goals?: string[];
  interests?: string[];
  about?: string;
}) => {
  try {
    if (!store.session.user) {
      return;
    }

    const user = store.session.user;

    await api.api.usersMePartialUpdate(
      {
        first_name,
        avatar: avatar as string | null | undefined,
        country: country as string | undefined,
        birth_date,
        languages,
        gender,
        goals: goals as string[] | undefined,
        interests,
        about,
      },
      { headers }
    );

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
    console.log("features.updateProfile", error);
  }
};
