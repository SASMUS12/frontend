import { store } from '../../models/store';
import { getAcceessToken, getMe } from '../../utils/rest/auth';
import { useNavigate } from 'react-router-dom';

export const Authenticate = async (): Promise<void> => {
  const navigate = useNavigate();
  const handleUpdateUser = async () => {
    const user = await getMe();

    if (user) {
      store.session.update(user);
    }
  };

  const handleAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const accessToken = await getAcceessToken(refreshToken);
      if (accessToken) {
        store.session.setAccessToken(accessToken.access);
      }
    }
  };

  const toSignin = () => {
    return '/';
  };

  try {
    if (localStorage.getItem('accessToken') !== null) {
      await handleUpdateUser();
    }
  } catch (error) {
    console.log('authenticate: get user error', error);
  }

  try {
    if (
      localStorage.getItem('accessToken') === null &&
      localStorage.getItem('refreshToken') !== null
    ) {
      await handleAccessToken();
    }
  } catch (error) {
    console.log('authenticate: get access token error', error);
  }

  try {
    if (
      localStorage.getItem('accessToken') === null &&
      localStorage.getItem('refreshToken') === null
    ) {
      navigate(toSignin());
    }
  } catch (error) {
    console.log('authenticate: move to signin error', error);
  }
};
