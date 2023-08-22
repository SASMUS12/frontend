/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from 'react';
import styles from '../../components/LanguageLevel/LanguageLevel.module.scss';
import {
  Language,
  UserForeignLanguage,
  UserNativeLanguage,
} from '../../utils/openapi';

export enum SkillLevelEnum {
  Newbie = 'Newbie',
  Amateur = 'Amateur',
  Profi = 'Profi',
  Expert = 'Expert',
  Guru = 'Guru',
  Native = 'Native',
}

const skillLevelNames: Record<SkillLevelEnum, string> = {
  [SkillLevelEnum.Newbie]: 'Новичок',
  [SkillLevelEnum.Amateur]: 'Любитель',
  [SkillLevelEnum.Profi]: 'Профи',
  [SkillLevelEnum.Expert]: 'Эксперт',
  [SkillLevelEnum.Guru]: 'Гуру',
  [SkillLevelEnum.Native]: 'Носитель',
};

interface LanguageLevelProps {
  languages: Language[];
  onAdd: (language: UserForeignLanguage | UserNativeLanguage) => void;
  onRemove?: (language: UserForeignLanguage | UserNativeLanguage) => void;
  onClearFilter: () => void;
}

const LanguageLevel: React.FC<LanguageLevelProps> = ({
  languages,
  onAdd,
  onRemove,
  onClearFilter,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null,
  );
  const [selectedLevels, setSelectedLevels] = useState<
    (UserForeignLanguage | UserNativeLanguage)[]
  >([]);
  const [filterCleared, setFilterCleared] = useState(false);

  useEffect(() => {
    if (filterCleared) {
      clearLanguageLevelState();
      setFilterCleared(false);
      onClearFilter();
    }
  }, [filterCleared, onClearFilter]);

  const handleClearFilterClick = () => {
    onClearFilter();
  };

  const clearLanguageLevelState = () => {
    setSelectedLanguage(null);
    setSelectedLevels([]);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const languageName = e.target.value;

    if (languageName === '') {
      setSelectedLanguage(null);
      console.log("Выбрана опция 'Напишите или выберете'");
    } else {
      const language = languages.find((lang) => lang.name === languageName);
      if (language) {
        setSelectedLanguage(language);
        console.log('Выбран язык:', language.name);
      } else {
        setSelectedLanguage(null);
        console.log('Язык не найден:', languageName);
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillLevel = e.target.value as keyof typeof SkillLevelEnum;

    const languageCode = e.target.name;

    const language = languages.find((lang) => lang.name === languageCode);

    if (language) {
      console.log('Выбран язык:', language.name);

      if (skillLevel === SkillLevelEnum.Native) {
        const userLanguage: UserNativeLanguage = {
          language: language.name,
          isocode: language.isocode,
        };

        if (e.target.checked) {
          if (selectedLevels.length < 3) {
            onAdd(userLanguage);
            setSelectedLevels((prevLevels) => [...prevLevels, userLanguage]);
            console.log('Добавлен носитель языка:', userLanguage.language);
          } else {
            console.log('Нельзя выбрать более 3 уровней');
          }
        } else {
          onRemove?.(userLanguage);
          setSelectedLevels((prevLevels) =>
            prevLevels.filter((lang) => lang.language !== language.name),
          );
          console.log('Удален носитель языка:', userLanguage.language);
        }
      } else {
        const userLanguage: UserForeignLanguage = {
          language: language.name,
          isocode: language.isocode,
          // пример* skill_level: SkillLevelEnum.SomeValue, замени SomeValue на конкретное значение
          // @ts-ignore
          skill_level: SkillLevelEnum,
        };

        if (e.target.checked) {
          if (
            selectedLevels.filter(
              (lang) => 'skill_level' in lang && lang.skill_level,
            ).length < 5
          ) {
            onAdd(userLanguage);
            setSelectedLevels((prevLevels) => [...prevLevels, userLanguage]);
            console.log(
              'Добавлен иностранный язык:',
              userLanguage.language,
              'Уровень владения:',
              userLanguage.skill_level,
            );
          } else {
            console.log('Нельзя выбрать более 5 языков с уровнем владения');
          }
        } else {
          onRemove?.(userLanguage);
          setSelectedLevels((prevLevels) =>
            prevLevels.filter((lang) => lang.language !== language.name),
          );
          console.log(
            'Удален иностранный язык:',
            userLanguage.language,
            'Уровень владения:',
            userLanguage.skill_level,
          );
        }
      }
    } else {
      console.log('Язык не найден:', languageCode);
    }
  };

  return (
    <>
      <div className={styles.language}>
        <select
          className={styles.language__items}
          value={selectedLanguage?.name || ''}
          onChange={handleSelectChange}
        >
          <option value='' disabled hidden>
            Напишите или выберете
          </option>
          {languages.map((language) => (
            <option key={language.isocode} value={language.name}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.language__level}>
        {Object.entries(SkillLevelEnum).map(([key, value]) => (
          <label key={value} className={styles.language__level_label}>
            <input
              type='checkbox'
              name={key}
              value={SkillLevelEnum[value]}
              onChange={handleCheckboxChange}
              className={styles.language__level_input}
              disabled={
                (value === SkillLevelEnum.Native &&
                  selectedLevels.length >= 3) ||
                (value !== SkillLevelEnum.Native &&
                  selectedLevels.filter(
                    (lang) =>
                      'skill_level' in lang &&
                      lang.skill_level === SkillLevelEnum[value],
                  ).length >= 5)
              }
            />
            <span className={styles.language__level_checkbox_visible}></span>
            {skillLevelNames[value]}
          </label>
        ))}
      </div>
    </>
  );
};

export default LanguageLevel;
