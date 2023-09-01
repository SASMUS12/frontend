import { useNavigate } from "react-router-dom";
import { useLocalObservable } from "mobx-react-lite";

import { getMe } from "../../utils/rest/auth";
import { session } from "../../models/session/Session";

import {
  GenderEnum,
  Country,
  Language,
  SkillLevelEnum,
} from "../../utils/openapi";
import { api, headersWithToken as headers } from "../../utils/constants";
import { store } from "../../models/store";

export const useModel = () => {
  const user = store.session.user;
  console.log("какой же тут пользователь???", user);

  const model = useLocalObservable(() => {
    return {
      firstName: "",
      username: "",
      birthdate: "",
      calculatedBirthday: "",
      gender: "Male" as GenderEnum | null,
      avatar: "",
      avatarBase64: "",
      avatarFile: null as File | null,
      previewAvatar: "",
      countries: [] as Country[],
      languagesAndLevels: [
        {
          language: {} as Language | null,
          skillLevels: [] as SkillLevelEnum[],
        },
      ],
      languages: [
        { isocode: "", language: "", skill_level: {} as SkillLevelEnum },
      ],
      error: {
        firstName: "",
        birthdate: "",
        avatar: "",
        countries: "",
        languages: "",
      },
      message: "",
      isSubmitButtonDisabled: false,
      isLoading: false,
      isExportAvatarModal: false,
      isCreateAvatarModal: false,

      async handleCurrentUser() {
        try {
          const user = await getMe();

          if (user) {
            session.updateUser(user);
            model.firstName = user.first_name ?? "";
            model.gender = user.gender ?? null;
            model.birthdate = user.birth_date ?? "";
            model.avatar = user.avatar ?? "";
            model.countries[0].name = user.country ?? "";
            model.languages = user.languages ?? [];
            console.log(user);
          }
        } catch (error: any) {
          model.message = error.message;
        }
      },
    };
  });

  return model;
};
