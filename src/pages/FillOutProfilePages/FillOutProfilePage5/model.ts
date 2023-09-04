import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalObservable } from 'mobx-react-lite';

import { Interest } from '../../../utils/openapi';
import { api, headersWithToken as headers } from '../../../utils/constants';
import { store } from '../../../models/store';

export const useModel = () => {
  const navigate = useNavigate();
  const user = store.session.user;

  const model = useLocalObservable(() => {
    return {
      selectedInterests: [] as Interest[],
      error: { selectedInterests: '' },
      message: '',
      isSubmitButtonDisabled: false,
      isLoading: false,

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
        navigate('/fill-out-4');
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
          selectedInterests: '',
        };

        if (model.selectedInterests === null) {
          model.error.selectedInterests = 'Пожалуйста, укажите Ваши интересы';
        }

        if (model.error.selectedInterests !== '') {
          return;
        }

        console.log(model.selectedInterests);

        const finalInterests = model.selectedInterests.map((item) => ({
          name: item.name,
        }));

        const finalInterestsArray = finalInterests.map((item) => item.name);

        console.log(finalInterestsArray);

        model.message = '';
        model.isLoading = true;
        try {
          const getUpdateUser = await api.api.usersMePartialUpdate(
            {
              interests: finalInterestsArray,
            },
            { headers },
          );

          if (getUpdateUser && user) {
            store.session.updateUser({
              ...user,
              interests: finalInterestsArray,
            });
          }

          navigate('/fill-out-6');
          model.isLoading = false;
        } catch (error: any) {
          console.log(model.selectedInterests);
          console.log('fill-out-5 error:', error);
          model.isLoading = false;
        }
      },
    };
  });

  return model;
};
