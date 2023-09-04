import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalObservable } from 'mobx-react-lite';
import { toJS } from 'mobx';

import { getMe } from '../../../utils/rest/auth';
import { session } from '../../../models/session/Session';

import { api, headersWithToken as headers } from '../../../utils/constants';
import { store } from '../../../models/store';
import styles from '../FillOutProfilePages.module.scss';

interface selectedGoals {
  icon: string;
  name: string;
  description: string;
  active: boolean;
}
export const useModel = () => {
  const navigate = useNavigate();
  const user = store.session.user;
  console.log(user);

  const model = useLocalObservable(() => {
    return {
      selectedGoals: [] as selectedGoals[],
      commonGoals: [] as selectedGoals[],
      error: { goals: '' },
      message: '',
      isSubmitButtonDisabled: false,
      isLoading: false,

      async handleCurrentUser() {
        try {
          const user = await getMe();

          if (user) {
            session.updateUser(user);

            model.commonGoals = model.selectedGoals.filter((goal) => {
              if (user.goals) {
                user.goals.includes(goal.name);
              }
            });
            console.log(toJS(model.selectedGoals));
            console.log(model.commonGoals);
          }
        } catch (error: any) {
          model.message = error.message;
        }
      },

      handleSubmitButtonDisabled() {
        toJS(model.selectedGoals).length === 0
          ? (model.isSubmitButtonDisabled = true)
          : (model.isSubmitButtonDisabled = false);
        console.log(model.isSubmitButtonDisabled);
      },

      handleReturnButtonClick() {
        navigate('/fill-out-3');
      },

      handleGoalButtonClick(event: any, goal: any) {
        const updatedGoals = [...model.selectedGoals];

        console.log(goal.active);

        if (!goal.active) {
          goal.active = true;
          updatedGoals.push(goal);
          model.selectedGoals = updatedGoals;
          event.currentTarget.classList.add(
            styles.container__goals_goal_active,
          );
          console.log(model.selectedGoals);
        } else {
          goal.active = false;
          model.selectedGoals.filter((selectedGoal) => selectedGoal.active);
          event.currentTarget.classList.remove(
            styles.container__goals_goal_active,
          );
          console.log(model.selectedGoals);
        }
      },

      async handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        model.error = {
          goals: '',
        };

        if (model.selectedGoals === null) {
          model.error.goals = 'Пожалуйста, выберите цели';
        }

        if (model.error.goals !== '') {
          return;
        }

        model.message = '';
        model.isLoading = true;
        const goals = model.selectedGoals.map((goal) => goal.description);
        try {
          const getUpdateUser = await api.api.usersMePartialUpdate(
            {
              goals: goals,
            },
            { headers },
          );

          if (getUpdateUser && user) {
            store.session.updateUser({
              ...user,
              goals: goals,
            });
          }

          navigate('/fill-out-5');
          model.isLoading = false;
        } catch (error: any) {
          console.log('fill-out-4 error:', error);
          console.log(goals);
          model.isLoading = false;
        }
      },
    };
  });

  return model;
};
