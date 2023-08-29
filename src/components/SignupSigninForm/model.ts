import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalObservable } from 'mobx-react-lite';

import { getMe, signInWithEmail } from '../../utils/rest/auth';
import { signUp } from '../../utils/rest/register';
import { session } from '../../models/session/Session';

export const useModel = () => {
  const navigate = useNavigate();

  const model = useLocalObservable(() => {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      error: { username: '', email: '', password: '', confirmPassword: '' },
      message: '',
      refresh: '',
      access: '',
      isSignUp: false,

      handleValue({
        name,
        value,
      }: {
        name: 'username' | 'email' | 'password' | 'confirmPassword';
        value: string;
      }) {
        model[name] = value;
      },

      get toMain(): string {
        return '/';
      },

      get toFillOut(): string {
        return 'fill-out-1';
      },

      async handleRegister(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        model.error = {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        };

        if (model.username === '') {
          model.error.username = 'Пожалуйста, заполните поле username';
        }

        if (model.error.username !== '' || model.error.email !== '') {
          return;
        }

        model.message = '';
        model.isLoading = true;
        try {
          await signUp({
            email: model.email,
            username: model.username,
            password: model.password,
          });
        } catch (error: any) {
          model.message = error.message;
        }

        navigate(model.toFillOut);
        model.isLoading = false;
      },

      async handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        model.error = '';
        model.message = '';
        model.isLoading = true;

        const token = await signInWithEmail({
          username: model.email,
          password: model.password,
        });

        if (token) {
          session.setAccessToken(token.access);
          session.setRefreshToken(token.refresh);
        }

        model.isLoading = false;
      },

      async getCurrentUser() {
        model.error = '';
        model.message = '';
        model.isLoading = true;

        const user = await getMe();

        if (user) {
          session.update(user);
        }

        navigate(model.toMain);
        model.isLoading = false;
      },
    };
  });

  return model;
};
