import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalObservable } from 'mobx-react-lite';

import { getMe } from '../../../utils/rest/auth';
import { session } from '../../../models/session/Session';

import {
  Country,
  Language,
  SkillLevelEnum,
  UserLanguageRequest,
} from '../../../utils/openapi';
import { api, headersWithToken as headers } from '../../../utils/constants';
import { store } from '../../../models/store';

export const useModel = () => {
  const navigate = useNavigate();
  const user = store.session.user;
  console.log(user);

  const model = useLocalObservable(() => {
    return {
      countries: [] as Country[],
      languagesAndLevels: [
        {
          language: {} as Language | null,
          skillLevels: [] as SkillLevelEnum[],
        },
      ],
      languages: [
        { isocode: '', language: '', skill_level: {} as SkillLevelEnum },
      ],
      error: { countries: '', languages: '' },
      message: '',
      isSubmitButtonDisabled: false,
      isLoading: false,
      isErrorModalOpen: false,
      errorMessage: "",

      async handleCurrentUser() {
        try {
          const user = await getMe();

          if (user) {
            session.updateUser(user);
            model.countries[0].name = user.country ?? '';
            model.languages = user.languages ?? [];
          }
        } catch (error: any) {
          model.message = error.message;
        }
      },

      handleModalClose() {
        model.isErrorModalOpen = false;
      },

      handleCountriesValue(countries: Country[]) {
        if (countries) {
          model.countries = countries;
          console.log(model.countries);
        } else {
          model.countries = [];
        }
        console.log(model.countries);
      },

      handleLanguagesValue(
        languages: {
          language: Language | null;
          skillLevels: SkillLevelEnum[];
        }[],
      ) {
        if (languages) {
          model.languagesAndLevels = languages;
        }
        console.log(model.languages);
      },

      handleReturnButtonClick() {
        navigate('/fill-out-1');
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
          countries: '',
          languages: '',
        };

        if (model.countries === null) {
          model.error.languages = 'Пожалуйста, выберите язык';
        }

        if (model.languagesAndLevels === null) {
          model.error.languages = 'Пожалуйста, выберите язык';
        }

        if (model.error.countries !== '' || model.error.languages !== '') {
          return;
        }

        console.log(model.languagesAndLevels[0]);

        model.message = '';
        model.isLoading = true;
        try {
          const getUpdateUser = await api.api.usersMePartialUpdate(
            {
              country: model.countries[0].name,
              languages: [
                {
                  isocode: model.languagesAndLevels[0].language?.isocode || '',
                  skill_level: {} as SkillLevelEnum,
                },
              ],
            },
            { headers },
          );

          if (getUpdateUser && user) {
            store.session.updateUser({
              ...user,
              country: model.countries[0].name,
              languages: [
                {
                  language: model.languagesAndLevels[0].language?.name || '',
                  isocode: model.languagesAndLevels[0].language?.isocode || '',
                  skill_level: {} as SkillLevelEnum,
                },
              ],
            });
          }

          navigate('fill-out-3');
          model.isLoading = false;
        } catch (error: any) {
          console.log(model.languagesAndLevels[0]);
          console.log('fill-out-2 error:', error);
          model.isLoading = false;
        }
      },
    };
  });

  return model;
};
