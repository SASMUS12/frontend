import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalObservable } from "mobx-react-lite";

import { getMe } from "../../../utils/rest/auth";
import { session } from "../../../models/session/Session";

import { GenderEnum } from "../../../utils/openapi";
import { api, headersWithToken as headers } from "../../../utils/constants";
import { store } from "../../../models/store";

export const useModel = () => {
  const navigate = useNavigate();
  const user = store.session.user;
  console.log(user);

  const model = useLocalObservable(() => {
    return {
      firstName: "",
      birthdate: "",
      calculatedBirthday: "",
      gender: "Male" as GenderEnum | null,
      avatar: "",
      avatarBase64: "",
      avatarFile: "" as string | ArrayBuffer | null,
      previewAvatar: "",
      error: { firstName: "", birthdate: "", avatar: "" },
      message: "",
      isLoading: false,
      isExportAvatarModal: false,
      isCreateAvatarModal: false,
      isErrorModalOpen: false,
      errorMessage: "",

      async handleCurrentUser() {
        try {
          const user = await getMe();

          if (user) {
            session.updateUser(user);
            model.firstName = user.first_name ?? "";
            model.gender = user.gender ?? null;
            model.birthdate = user.birth_date ?? "";
            model.avatar = user.avatar ?? "";
          }
        } catch (error: any) {
          model.message = error.message;
        }
      },

      handleModalClose() {
        model.isExportAvatarModal = false;
        model.isCreateAvatarModal = false;
        model.isErrorModalOpen = false;
      },

      handleAvatarSelection(creationWay: string) {
        if (creationWay === "Загрузить") {
          model.isExportAvatarModal = true;
        } else {
          model.isCreateAvatarModal = true;
        }
      },

      handleValue({
        name,
        value,
      }: {
        name: "firstName" | "birthdate" | "avatar";
        value: string;
      }) {
        model[name] = value;
        console.log(model.firstName);
        console.log(model.birthdate);
        console.log(model.avatar);
      },

      handleGenderValue(gender: GenderEnum | null) {
        if (gender !== null) {
          model.gender = gender;
        } else {
          model.gender = null;
        }
        console.log(model.gender);
      },

      handleSetAvatarPhoto(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.currentTarget.files) {
          const file = event.currentTarget.files[0];
          if (file) {
            const fileSrc = URL.createObjectURL(file);

            model.handleValue({
              name: "avatar",
              value: fileSrc,
            });

            const reader = new FileReader();
            reader.onload = function (event) {
              if (event.target) {
                const base64Image = event.target.result;
                console.log(base64Image);
                model.avatarFile = base64Image;
              }
            };
            reader.readAsDataURL(file);

            model.handleModalClose();
            console.log(model.avatar);
          }
        }
      },

      handleSetAvatarValue(selectedAvatar: string) {
        model.previewAvatar = selectedAvatar;
      },

      handleSetAvatar() {
        model.avatar = model.previewAvatar;
        model.handleModalClose();
      },

      async handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        model.error = {
          firstName: "",
          birthdate: "",
          avatar: "",
        };

        if (model.firstName === "") {
          model.error.firstName = "Пожалуйста, введите Ваше имя";
        }

        if (model.birthdate === "") {
          model.error.birthdate = "Пожалуйста, введите дату рождения";
        }

        if (
          model.avatar === "" ||
          model.avatar === "../../images/fill-out-profile-export-avatar.png"
        ) {
          model.error.avatar = "Пожалуйста, выберете аватар";
        }

        if (
          model.error.firstName !== "" ||
          model.error.birthdate !== "" ||
          model.error.avatar !== ""
        ) {
          return;
        }

        model.message = "";
        model.isLoading = true;
        try {
          const getUpdateUser = await api.api.usersMePartialUpdate(
            {
              first_name: model.firstName,
              avatar: model.avatarFile as string,
              birth_date: model.birthdate,
              gender: model.gender,
            },
            { headers }
          );

          if (getUpdateUser && user) {
            store.session.updateUser({
              ...user,
              first_name: model.firstName,
              avatar: model.avatar,
              birth_date: model.birthdate,
              gender: model.gender,
            });
          }

          navigate("/fill-out-2");
          model.isLoading = false;
        } catch (error: any) {
          console.log("fill-out-1 error:", error);
          const secondError = Object.values(error)[1];
          const ErrorString = Object.values(
            secondError as { [s: string]: unknown }
          ).join("\n");
          console.log(ErrorString);
          model.errorMessage = ErrorString;
          model.isErrorModalOpen = true;
          model.isLoading = false;
        }
      },
    };
  });

  return model;
};
