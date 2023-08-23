import cardAvatarMale1 from '../../images/svg/avatars/card-avatar-male-1.svg';
import cardAvatarMale2 from '../../images/svg/avatars/card-avatar-male-2.svg';
import cardAvatarFemale1 from '../../images/svg/avatars/card-avatar-female-1.svg';
import cardAvatarFemale2 from '../../images/svg/avatars/card-avatar-female-2.svg';
import cardAvatarFemale3 from '../../images/svg/avatars/card-avatar-female-3.svg';
import cardAvatarFemale4 from '../../images/svg/avatars/card-avatar-female-4.svg';

const cardMaleAvatars = [cardAvatarMale1, cardAvatarMale2];

const cardFemaleAvatars = [
  cardAvatarFemale1,
  cardAvatarFemale2,
  cardAvatarFemale3,
  cardAvatarFemale4,
];

export const сardRandomMaleAvatar = () => {
  const randomAvatars = Math.floor(Math.random() * cardMaleAvatars.length);
  console.log(cardMaleAvatars[randomAvatars]);
  return cardMaleAvatars[randomAvatars];
};

export const сardRandomFemaleAvatar = () => {
  const randomAvatars = Math.floor(Math.random() * cardFemaleAvatars.length);
  return cardFemaleAvatars[randomAvatars];
};
