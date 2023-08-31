import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalObservable } from "mobx-react-lite";

import { getMe } from "../../../utils/rest/auth";
import { session } from "../../../models/session/Session";

import { GenderEnum } from "../../../utils/openapi";
import { api, headersWithToken as headers } from "../../../utils/constants";
import { store } from "../../../models/store";

import base64js from "base64-js";

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
      avatarFile: null as File | null,
      previewAvatar: "",
      error: { firstName: "", birthdate: "", avatar: "" },
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

        const string = model.avatar as string;

        // const reader = new FileReader();
        // reader.onload = function (event) {
        //   if (event.target) {
        //     const base64Image = event.target.result;
        //     console.log(base64Image);
        //     model.avatarFile = base64Image;
        //   }
        // };
        // reader.readAsDataURL(file);

        function Base64Encode(inputString: string, encoding = "utf-8") {
          const encoder = new TextEncoder();
          const bytes = encoder.encode(inputString);
          console.log(base64js.fromByteArray(bytes));
          model.avatarBase64 = base64js.fromByteArray(bytes);
        }

        Base64Encode(string);

        const base64toBlob = (
          base64: string,
          onsuccess: (blob: Blob | null) => void
        ) => {
          const img = new Image();

          img.onload = function onload() {
            const canvas = document.createElement("canvas");

            canvas.height = img.height;
            canvas.width = img.width;

            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
            canvas.toBlob(onsuccess);
            console.log(canvas.toBlob(onsuccess));
          };
          img.src = base64;
        };

        base64toBlob(model.avatarBase64, model.avatarFile);
        console.log(model.avatarFile);

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
