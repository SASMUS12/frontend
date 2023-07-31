import { FC } from 'react';

import beginningLevel from '../../../images/svg/card-language-levels-beginning.svg';
import continuingLevel from '../../../images/svg/card-language-levels-continuing.svg';
import profiLevel from '../../../images/svg/card-language-levels-profi.svg';

import styles from './LanguagesTag.module.scss';

interface IProps {
  languages: any;
}

const LanguagesTag: FC<IProps> = ({ languages }) => {
  const getSkillLevel = (skillLevel: string) => {
    return skillLevel === 'Начинающий'
      ? beginningLevel
      : skillLevel === 'Средний'
      ? continuingLevel
      : profiLevel;
  };

  return (
    <li className={styles.languageItem}>
      <img
        className={styles.skillLevel}
        src={getSkillLevel(languages.skill_level)}
        alt="Уровень владения языком"
      />
      <p className={styles.language}>{languages.code}</p>
    </li>
  );
};

export default LanguagesTag;
