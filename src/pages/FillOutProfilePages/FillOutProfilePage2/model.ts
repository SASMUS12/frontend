import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalObservable } from "mobx-react-lite";

import { getMe } from "../../../utils/rest/auth";
import { session } from "../../../models/session/Session";

import { Country, GenderEnum } from "../../../utils/openapi";
import { api, headersWithToken as headers } from "../../../utils/constants";
import { store } from "../../../models/store";

export const useModel = () => {
  const navigate = useNavigate();
  const user = store.session.user;
  console.log(user);

  const model = useLocalObservable(() => {
    return {
      countries: [] as Country[],
      birthdate: "",
      calculatedBirthday: "",
      gender: "Male" as GenderEnum | null,
      avatar: "",
      avatarFile: null as File | null,
      previewAvatar: "",
      errorFillOut1: { firstName: "", birthdate: "", avatar: "" },
      message: "",
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
          }
        } catch (error: any) {
          model.message = error.message;
        }
      },

      handleModalClose() {
        model.isExportAvatarModal = false;
        model.isCreateAvatarModal = false;
      },

      handleCountriesValue(countries: Country[]) {
        if (countries) {
          model.countries = countries;
        } else {
          model.countries = [];
        }
        console.log(model.countries);
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
            model.handleValue({
              name: "avatar",
              value: URL.createObjectURL(file),
            });

            const reader = new FileReader();
            reader.onload = () => {
              const base64Data = reader.result as null;
              if (base64Data) {
                model.avatarFile = base64Data;
              }
            };
            reader.readAsDataURL(file);

            console.log("imageBase64", model.avatarFile);

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

      async handleFillOut1Submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        model.errorFillOut1 = {
          firstName: "",
          birthdate: "",
          avatar: "",
        };

        if (model.firstName === "") {
          model.errorFillOut1.firstName = "Пожалуйста, введите Ваше имя";
        }

        if (model.birthdate === "") {
          model.errorFillOut1.birthdate = "Пожалуйста, введите дату рождения";
        }

        if (
          model.avatar === "" ||
          model.avatar === "../../images/fill-out-profile-export-avatar.png"
        ) {
          model.errorFillOut1.avatar = "Пожалуйста, выберете аватар";
        }

        if (
          model.errorFillOut1.firstName !== "" ||
          model.errorFillOut1.birthdate !== "" ||
          model.errorFillOut1.avatar !== ""
        ) {
          return;
        }

        model.message = "";
        model.isLoading = true;
        try {
          const getUpdateUser = await api.api.usersMePartialUpdate(
            {
              first_name: model.firstName,
              avatar: model.avatarFile,
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
          model.isLoading = false;
        }
      },
    };
  });

  return model;
};
