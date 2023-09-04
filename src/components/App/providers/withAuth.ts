import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { authenticate } from '../../../features/authenticate/authenticate';
import { store } from '../../../models/store';
import { session } from '../../../models/session/Session';
import { GenderEnum, NullEnum, UserLanguage } from '../../../utils/openapi';

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
          username: user.username as string,
          first_name: user.first_name as string,
          avatar: user.avatar as string,
          age: user.age as string,
          slug: user.slug as string | null,
          country: user.country as string | null,
          languages: user.languages as UserLanguage[],
          gender: user.gender as GenderEnum | NullEnum | null,
          goals: user.goals as string[],
          interests: user.interests as string[],
          about: user.about as string,
          last_activity: user.last_activity as string | null,
          is_online: user.is_online as boolean,
          gender_is_hidden: user.gender_is_hidden as boolean,
          age_is_hidden: user.age_is_hidden as boolean,
          role: user.role as string,
          is_blocked: user.is_blocked as boolean,
          birth_date: user.birth_date as string | null,
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
