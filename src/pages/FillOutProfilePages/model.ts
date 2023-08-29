import { useLocalObservable } from 'mobx-react-lite';
import { FormEvent } from 'react';

import { getMe } from '../../utils/rest/auth';
import { session } from '../../models/session/Session';

import { GenderEnum } from '../../utils/openapi';

export const useModel = () => {
  const model = useLocalObservable(() => {
    return {
      firstName: '',
      gender: 'Male',
      birthdate: '',
      country: '',
      interest: '',
      about: '',
      error: { firstName: '', gender: '', birthdate: '' },
      message: '',
      isLoading: false,

      handleValue({
        name,
        value,
      }: {
        name: 'firstName' | 'birthdate' | 'country' | 'interest' | 'about';
        value: string;
      }) {
        model[name] = value;
      },

      handleGenderValue(value: GenderEnum | null) {
        model.gender = value;
      },

      async handleFillOut1Submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        model.error = {
          firstName: '',
          gender: '',
          birthdate: '',
        };

        if (model.firstName === '') {
          model.error.firstName = 'Пожалуйста, введите Ваше имя';
        }

        if (model.gender === '') {
          model.error.gender = 'Пожалуйста, укажите Ваш пол';
        }

        if (model.birthdate === '') {
          model.error.birthdate = 'Пожалуйста, введите дату рождения';
        }

        if (
          model.error.firstName !== '' ||
          model.error.gender !== '' ||
          model.error.birthdate !== ''
        ) {
          return;
        }

        model.message = '';
        model.isLoading = true;
        try {
          const user = await getMe();

          if (user) {
            session.updateUser(user);
          }
        } catch (error: any) {
          model.message = error.message;
        }
      },
    };
  });

  return model;
};
