import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalObservable } from "mobx-react-lite";

import { getMe } from "../../../utils/rest/auth";
import { session } from "../../../models/session/Session";

import { Language, SkillLevelEnum } from "../../../utils/openapi";
import { api, headersWithToken as headers } from "../../../utils/constants";
import { store } from "../../../models/store";

export const useModel = () => {
  const navigate = useNavigate();
  const user = store.session.user;
  console.log(user);

  const model = useLocalObservable(() => {
    return {
      languagesAndLevels: [
        {
          language: {} as Language | null,
          skillLevels: [] as SkillLevelEnum[],
        },
      ],
      languages: [
        { isocode: "", language: "", skill_level: {} as SkillLevelEnum },
      ],
      error: { languages: "" },
      message: "",
      isSubmitButtonDisabled: false,
      isLoading: false,
      isHelpModalOpen: false,
      errorMessage: "",

      async handleCurrentUser() {
        try {
          const user = await getMe();

          if (user) {
            session.updateUser(user);
            model.languages = user.languages ?? [];
          }
        } catch (error: any) {
          model.message = error.message;
        }
      },

      handleHelpButtonClick() {
        model.isHelpModalOpen = true;
      },

      handleModalClose() {
        model.isHelpModalOpen = false;
      },

      handleLanguagesValue(
        languages: {
          language: Language | null;
          skillLevels: SkillLevelEnum[];
        }[]
      ) {
        if (languages) {
          model.languagesAndLevels = languages;
        }
        console.log(model.languages);
      },

      handleReturnButtonClick() {
        navigate("/fill-out-2");
      },

      handleSubmitButtonDisabled() {
        for (let i = 0; i < model.languagesAndLevels.length; i++) {
          model.languagesAndLevels[i].language === null
            ? (model.isSubmitButtonDisabled = true)
            : (model.isSubmitButtonDisabled = false);
        }
      },

      async handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        model.error = {
          languages: "",
        };

        if (model.languagesAndLevels === null) {
          model.error.languages = "Пожалуйста, выберите язык";
        }

        if (model.error.languages !== "") {
          return;
        }

        model.message = "";
        model.isLoading = true;

        try {
          const getUpdateUser = await api.api.usersMePartialUpdate(
            {
              languages: [
                {
                  isocode: model.languagesAndLevels[0].language?.isocode || "",
                  skill_level: model.languagesAndLevels[0].skillLevels[0],
                },
              ],
            },
            { headers }
          );

          if (getUpdateUser && user) {
            store.session.updateUser({
              ...user,
              languages: [
                {
                  language: model.languagesAndLevels[0].language?.name || "",
                  isocode: model.languagesAndLevels[0].language?.isocode || "",
                  skill_level: model.languagesAndLevels[0].skillLevels[0],
                },
              ],
            });
          }

          navigate("/fill-out-4");
          model.isLoading = false;
        } catch (error: any) {
          console.log(model.languagesAndLevels[0]);
          console.log("fill-out-3 error:", error);
          model.isLoading = false;
        }
      },
    };
  });

  return model;
};
