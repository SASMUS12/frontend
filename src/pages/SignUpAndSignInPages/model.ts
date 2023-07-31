import { useLocalObservable } from "mobx-react-lite";
import {FormEvent} from "react";
import {api} from "../../utils/constants";

export const useModel = () => {
  const model = useLocalObservable(() => {
    return {
      isLoading: false,
      error: "",
      message: "",
      email: "",
      password: "",

      handleEmailChange({ value }: { value: string }) {
        model.email = value;
      },

      handlePasswordChange({ value }: { value: string }) {
        model.password = value;
      },

      // async handleLogin(event: FormEvent<HTMLFormElement>) {
      //   event.preventDefault();
      //
      //   model.error = "",
      //       model.message = "",
      //       model.isLoading = true;
      //   const response = await api.api.usersCreate({ email: model.email });
      //
      //   console.log('ответ получен -', response);
      //   setIsUsersList(true);
      //
      //   if (response.data && response.data.results) {
      //     setUsersList(response.data.results);
      //     console.log(response.data.results);
      //   }
      // } catch (error) {
      //   console.error('Ошибка при получении данных -', error);
      //   setIsUsersList(false);
      // }

      //   try {
      //     await signInWithEmail({ email: model.email });
      //     model.message = "Check your email for the login link!";
      //   } catch (error) {
      //     model.error = "Oops, something went wrong";
      //   }
      //
      //   model.isLoading = false;
      // },

    };
  });

  return model;
};
