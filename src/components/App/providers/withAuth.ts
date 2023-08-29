import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { authenticate } from '../../../features/authenticate/authenticate';
import { store } from '../../../models/store';
import { session } from '../../../models/session/Session';
import {
  Country,
  GenderEnum,
  Goal,
  NullEnum,
  UserLanguage,
} from '../../../utils/openapi';

export const withAuth = (component: () => ReactNode) => () => {
  useEffect(() => {
    (async () => {
      await authenticate();
    })();

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      if (session?.user) {
        const { user } = session;
        store.session.updateUser({
          first_name: user.first_name as string,
          avatar: user.avatar as string,
          country: user.country as Country,
          birth_date: user.birth_date as string,
          languages: user.languages as UserLanguage[],
          gender: user.gender as GenderEnum | NullEnum | null,
          goals: user.goals as Goal[],
          interests: user.interests as string[],
          about: user.about as string,
        });
      }
    }

    if (!accessToken && refreshToken) {
      store.session.setAccessToken(refreshToken);
    }

    if (!accessToken && !refreshToken) {
      store.session.signOut();
    }
  }, []);

  return component();
};
