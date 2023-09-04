import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalObservable } from "mobx-react-lite";

import { getMe } from "../../../utils/rest/auth";
import { session } from "../../../models/session/Session";

import { api, headersWithToken as headers } from "../../../utils/constants";
import { store } from "../../../models/store";

export const useModel = () => {
  const navigate = useNavigate();
  const user = store.session.user;
  console.log(user);

  const model = useLocalObservable(() => {
    return {
      about: "",
      error: { about: "" },
      message: "",
      isSubmitButtonDisabled: false,
      isLoading: false,

      async handleCurrentUser() {
        try {
          const user = await getMe();

          if (user) {
            session.updateUser(user);
            model.about = user.about ?? "";
          }
        } catch (error: any) {
          model.message = error.message;
        }
      },

      handleValue({ name, value }: { name: "about"; value: string }) {
        model[name] = value;
      },

      handleReturnButtonClick() {
        navigate("/fill-out-5");
      },

      handleSubmitButtonDisabled() {
        model.about.length < 1
          ? (model.isSubmitButtonDisabled = true)
          : (model.isSubmitButtonDisabled = false);
      },

      to() {
        return "/";
      },

      async handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        model.error = {
          about: "",
        };

        if (model.about === "") {
          model.error.about = "Пожалуйста, расскажите о себе";
        }

        if (model.error.about !== "") {
          return;
        }

        model.message = "";
        model.isLoading = true;
        try {
          const getUpdateUser = await api.api.usersMePartialUpdate(
            {
              about: model.about,
            },
            { headers }
          );

          if (getUpdateUser && user) {
            store.session.updateUser({
              ...user,
              about: model.about,
            });
          }

          navigate(model.to());
          model.isLoading = false;
        } catch (error: any) {
          console.log("fill-out-6 error:", error);
          model.isLoading = false;
        }
      },
    };
  });

  return model;
};
