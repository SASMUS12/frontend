import { FC } from 'react';

import newbieLevel from '../../../images/svg/card-language-levels-newbie.svg';
import amateurLevel from '../../../images/svg/card-language-levels-amateur.svg';
import profiLevel from '../../../images/svg/card-language-levels-profi.svg';
import expertLevel from '../../../images/svg/card-language-levels-expert.svg';
import guruLevel from '../../../images/svg/card-language-levels-guru.svg';

import styles from './LanguagesTag.module.scss';

interface IProps {
  languages: any;
}

const LanguagesTag: FC<IProps> = ({ languages }) => {
  const getSkillLevel = (skillLevel: string) => {
    return skillLevel === 'Newbie'
      ? newbieLevel
      : skillLevel === 'Amateur'
      ? amateurLevel
      : skillLevel === 'Profi'
      ? profiLevel
      : skillLevel === 'Expert'
      ? expertLevel
      : guruLevel;
  };

  return (
    <li className={styles.languageItem}>
      <img
        className={styles.skillLevel}
        src={getSkillLevel(languages.skill_level)}
        alt='Уровень владения языком'
      />
      <p className={styles.language}>{languages.isocode}</p>
    </li>
  );
};

export default LanguagesTag;
