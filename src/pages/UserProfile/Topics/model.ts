import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalObservable } from "mobx-react-lite";

import { getMe } from "../../../utils/rest/auth";
import { session } from "../../../models/session/Session";

import { Interest } from "../../../utils/openapi";
import { api, headersWithToken as headers } from "../../../utils/constants";
import { store } from "../../../models/store";

export const useModel = () => {
  const navigate = useNavigate();
  const user = store.session.user;
  console.log(user);

  const model = useLocalObservable(() => {
    return {
      selectedInterests: [] as Interest[],
      error: { selectedInterests: "" },
      message: "",
      isSubmitButtonDisabled: false,
      isLoading: false,

      async handleCurrentUser() {
        try {
          const user = await getMe();

          if (user) {
            session.updateUser(user);
            model.selectedInterests = user.interests ?? "";
          }
        } catch (error: any) {
          model.message = error.message;
        }
      },

      setSelectedInterests(selectedInterests: Interest[]) {
        if (selectedInterests) {
          model.selectedInterests = selectedInterests;
          console.log(model.selectedInterests);
        } else {
          model.selectedInterests = [];
        }
        console.log(model.selectedInterests);
      },

      handleReturnButtonClick() {
        navigate("/fill-out-4");
      },

      handleSubmitButtonDisabled() {
        for (let i = 0; i < model.selectedInterests.length; i++) {
          model.selectedInterests[i].name === null
            ? (model.isSubmitButtonDisabled = true)
            : (model.isSubmitButtonDisabled = false);
        }
      },

      async handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        model.error = {
          selectedInterests: "",
        };

        if (model.selectedInterests === null) {
          model.error.selectedInterests = "Пожалуйста, укажите Ваши интересы";
        }

        if (model.error.selectedInterests !== "") {
          return;
        }

        console.log(model.selectedInterests);

        model.message = "";
        model.isLoading = true;
        try {
          const getUpdateUser = await api.api.usersMePartialUpdate(
            {
              interests: model.selectedInterests,
            },
            { headers }
          );

          if (getUpdateUser && user) {
            store.session.updateUser({
              ...user,
              interests: model.selectedInterests,
            });
          }

          navigate("/fill-out-3");
          model.isLoading = false;
        } catch (error: any) {
          console.log(model.selectedInterests);
          console.log("fill-out-5 error:", error);
          model.isLoading = false;
        }
      },
    };
  });

  return model;
};
