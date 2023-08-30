import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalObservable } from 'mobx-react-lite';

import { getMe } from '../../utils/rest/auth';
import { updateProfile } from '../../utils/rest/updateProfile';
import { session } from '../../models/session/Session';

import { GenderEnum, UserProfile } from '../../utils/openapi';
import { api } from '../../utils/constants';
import { store } from '../../models/store';
import { User } from '../../models/session/User';

export const useModel = () => {
  const navigate = useNavigate();

  const model = useLocalObservable(() => {
    return {
      firstName: '',
      birthdate: '',
      gender: 'Male' as GenderEnum | null,
      avatar: '',
      avatarFile: null as File | null,
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

            const reader = new FileReader();
            reader.onload = () => {
              const base64Data = reader.result as null;
              if (base64Data) {
                model.avatarFile = base64Data;
              }
            };
            reader.readAsDataURL(file);

            console.log('imageBase64', model.avatarFile);

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
          const user = store.session.user;

          const getUpdateUser = await api.api.usersMePartialUpdate({
            first_name: model.firstName,
            avatar: model.avatarFile,
            birth_date: model.birthdate,
            gender: model.gender,
          });

          if (getUpdateUser) {
            store.session.updateUser({
              ...user,
              first_name: model.firstName,
              avatar: model.avatar,
              birth_date: model.birthdate,
              gender: model.gender,
            });
          }

          updateProfile({});
          navigate('/fill-out-2');
          model.isLoading = false;
        } catch (error: any) {
          console.log('fill-out-1 error:', error);
          model.isLoading = false;
        }
      },
    };
  });

  return model;
};
