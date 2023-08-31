import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalObservable } from "mobx-react-lite";

import { getMe } from "../../../utils/rest/auth";
import { updateProfile } from "../../../utils/rest/updateProfile";
import { session } from "../../../models/session/Session";

import { GenderEnum } from "../../../utils/openapi";
import { api, headersWithToken as headers } from "../../../utils/constants";
import { store } from "../../../models/store";

import fs from "fs";

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

            const imageBuffer = fs.readFileSync(fileSrc);
            const base64Image = imageBuffer.toString("base64");

            console.log(base64Image);

            // const reader = new FileReader();
            // reader.onload = () => {
            //   const base64Data = reader.result;
            //   if (base64Data) {
            //     model.avatarFile = base64Data;
            //   }
            //   console.log("imageBase64", reader.result);
            //   reader.readAsDataURL(file);

            // if (base64Data && typeof base64Data === "string") {
            //   // Создаем объект типа File, преобразовывая строку Base64 в Blob
            //   const blob = new Blob([base64Data], {
            //     type: "image/png" || "image/jpg" || "image/jpeg",
            //   });
            //   const file = new File(
            //     [blob],
            //     "filename.png" || "filename.jpg" || "filename.jpeg"
            //   );
            //
            //   model.avatarFile = blob;
            // }
            // };

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
