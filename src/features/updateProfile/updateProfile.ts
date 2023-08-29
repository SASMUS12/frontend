import { api } from '@/shared/api';
import { store } from '@/entities';

export const updateProfile = async ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  try {
    if (!store.session.user) {
      return;
    }

    const user = store.session.user;

    await api.profiles.updateProfile({
      userId: user.id,
      firstName,
      lastName,
    });

    store.session.update({
      ...user,
      firstName,
      lastName,
    });
  } catch (error) {
    console.log('features.updateProfile', error);
  }
};
