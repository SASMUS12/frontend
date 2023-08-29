import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalObservable } from 'mobx-react-lite';

import { getMe } from '../../utils/rest/auth';
import { session } from '../../models/session/Session';

import { GenderEnum } from '../../utils/openapi';

export const useModel = () => {
  const navigate = useNavigate();

  const model = useLocalObservable(() => {
    return {
      firstName: '',
      birthdate: '',
      gender: 'Male' as GenderEnum | null,
      avatar: '',
      previewAvatar: '',
      country: '',
      interest: '',
      about: '',
      errorFillOut1: { firstName: '', birthdate: '', avatar: '' },
      message: '',
      isLoading: false,
      isExportAvatarModal: false,
      isCreateAvatarModal: false,

      handleModalClose() {
        model.isExportAvatarModal = false;
        model.isCreateAvatarModal = false;
      },

      handleAvatarSelection(creationWay: string) {
        if (creationWay === 'Загрузить') {
          model.isExportAvatarModal = true;
        } else {
          model.isCreateAvatarModal = true;
        }
      },

      handleValue({
        name,
        value,
      }: {
        name:
          | 'firstName'
          | 'birthdate'
          | 'avatar'
          | 'country'
          | 'interest'
          | 'about';
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
              name: 'avatar',
              value: URL.createObjectURL(file),
            });



            // const handleFileInputChange = (
            //   event: React.ChangeEvent<HTMLInputElement>,
            // ) => {
            //   const file = event.target.files?.[0];
            //   if (file) {
            //     // eslint-disable-next-line no-undef
            //     const reader = new FileReader();
            //     reader.onload = () => {
            //       const base64Data = reader.result as null;
            //       if (base64Data) {
            //         setImageBase64(base64Data);
            //         setEditedData((prevData) => ({ ...prevData, avatar: base64Data }));
            //       }
            //     };
            //     reader.readAsDataURL(file);
            //   }
            //   // eslint-disable-next-line no-undef
            //   console.log('imageBase64', imageBase64);
            // };



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
          firstName: '',
          birthdate: '',
          avatar: '',
        };

        if (model.firstName === '') {
          model.errorFillOut1.firstName = 'Пожалуйста, введите Ваше имя';
        }

        if (model.birthdate === '') {
          model.errorFillOut1.birthdate = 'Пожалуйста, введите дату рождения';
        }

        if (
          model.avatar === '' ||
          model.avatar === '../../images/fill-out-profile-export-avatar.png'
        ) {
          model.errorFillOut1.avatar = 'Пожалуйста, выберете аватар';
        }

        if (
          model.errorFillOut1.firstName !== '' ||
          model.errorFillOut1.birthdate !== '' ||
          model.errorFillOut1.avatar !== ''
        ) {
          return;
        }

        model.message = '';
        model.isLoading = true;
        try {
          session.updateUser({
            first_name: model.firstName,
            avatar: ,
          birth_date: model.birthdate,
            gender: model.gender,
          });
          navigate('/fill-out-2');
        } catch (error: any) {
          model.message = error.message;
        }
      },
    };
  });

  return model;
};
