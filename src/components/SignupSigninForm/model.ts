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
          model.error.username = 'Пожалуйста, введите логин';
        }

        if (model.email === '') {
          model.error.email = 'Пожалуйста, введите эл. почту';
        }

        if (model.password === '') {
          model.error.password = 'Пожалуйста, введите пароль';
        }

        if (model.confirmPassword === '') {
          model.error.confirmPassword = 'Пожалуйста, подтвердите пароль';
        }

        if (model.password !== model.confirmPassword) {
          model.error.confirmPassword = 'Введенные пароли не совпадают';
        }

        if (
          model.error.username !== '' ||
          model.error.email !== '' ||
          model.error.password !== '' ||
          model.error.confirmPassword !== ''
        ) {
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
          navigate(model.toFillOut);
          model.isLoading = false;
        } catch (error: any) {
          model.message = error.message;
          model.isLoading = false;
        }
      },

      async handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        model.error = {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        };

        if (model.email === '') {
          model.error.email = 'Пожалуйста, введите логин или эл. почту';
        }

        if (model.password === '') {
          model.error.password = 'Пожалуйста, введите пароль';
        }

        if (model.error.email !== '' || model.error.password !== '') {
          return;
        }

        model.message = '';
        model.isLoading = true;

        try {
          const token = await signInWithEmail({
            username: model.email,
            password: model.password,
          });

          if (token) {
            session.setAccessToken(token.access);
            session.setRefreshToken(token.refresh);
          }
          model.isLoading = false;
        } catch (error: any) {
          model.message = error.message;
          model.isLoading = false;
        }
      },

      async getCurrentUser() {
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
