import { UserCreateRequest } from '../openapi';
import { api } from '../constants';

export const signUp = async ({
  email,
  username,
  password,
}: UserCreateRequest): Promise<void> => {
  const { error } = await api.api.usersCreate({
    email: email,
    username: username,
    password: password,
  });

  if (error) {
    throw error;
  }
};
