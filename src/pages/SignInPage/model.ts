import { useLocalObservable } from "mobx-react-lite";

interface ModelProps {
  email?: string;
  password: string;
  message?: string;
  isLoading?: boolean;
  error?: string;
}

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

    };
  });

  return model;
};
