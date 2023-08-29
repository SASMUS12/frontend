import { FC, useEffect, useState } from 'react';

import LanguageLevel from '../LanguageLevel/LanguageLevel';
import { Button } from '../UI/Button/Button';

import { Language, SkillLevelEnum } from '../../utils/openapi';
import { api } from '../../utils/constants';

import styles from './LanguageModule.module.scss';
import cn from 'classnames';
import { action } from 'mobx';

interface LanguageModuleProps {
  pageName: string;
  initialLanguageAndLevels: {
    language: Language | null;
    skillLevels: SkillLevelEnum[];
  };
  selectedLanguagesAndLevels: {
    language: Language | null;
    skillLevels: SkillLevelEnum[];
  }[];
  // eslint-disable-next-line no-empty-pattern
  setSelectedLanguagesAndLevels: ({}: {
    language: Language | null;
    skillLevels: SkillLevelEnum[];
  }[]) => void;
}

const LanguageModule: FC<LanguageModuleProps> = ({
  pageName,
  initialLanguageAndLevels,
  selectedLanguagesAndLevels,
  setSelectedLanguagesAndLevels,
}) => {
  const [languagesData, setLanguagesData] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null,
  );
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);

  useEffect(() => {
    const languagesInUse = selectedLanguagesAndLevels.map(
      (item) => item.language,
    );
    setSelectedLanguages(languagesInUse);
  }, [selectedLanguagesAndLevels]);

  //Запрос массива языков
  const fetchLanguagesData = async () => {
    try {
      console.log('отправка запроса ---');
      const response = await api.api.languagesList();
      console.log('ответ получен -', response);
      const languages = response.data;
      setLanguagesData(languages);
    } catch (error) {
      console.error('Ошибка при получении данных о языках:', error);
    }
  };

  useEffect(() => {
    fetchLanguagesData();
  }, []);

  const handleLanguageChange = (language: Language | null, index: number) => {
    if (index >= 0 && index < selectedLanguagesAndLevels.length) {
      const updatedLanguagesAndLevels = [...selectedLanguagesAndLevels];
      updatedLanguagesAndLevels[index].language = language;
      updatedLanguagesAndLevels[index].skillLevels = [];
      setSelectedLanguagesAndLevels(updatedLanguagesAndLevels);
    }
  };

  const handleSkillLevelsChange = (
    skillLevels: SkillLevelEnum[],
    index: number,
  ) => {
    if (index >= 0 && index < selectedLanguagesAndLevels.length) {
      const updatedLanguagesAndLevels = [...selectedLanguagesAndLevels];
      updatedLanguagesAndLevels[index].skillLevels = skillLevels;
      setSelectedLanguagesAndLevels(updatedLanguagesAndLevels);
    }
  };

  const handleReset = (index: number) => {
    const updatedLanguagesAndLevels = [...selectedLanguagesAndLevels];
    updatedLanguagesAndLevels[index].language = null;
    updatedLanguagesAndLevels[index].skillLevels = [];
    setSelectedLanguagesAndLevels(updatedLanguagesAndLevels);
  };

  const handleClearFilter = () => {
    const clearedLanguagesAndLevels = selectedLanguagesAndLevels.map(
      (item) => ({
        language: null,
        skillLevels: [],
      }),
    );
    setSelectedLanguagesAndLevels(clearedLanguagesAndLevels);
  };

  const handleAddLanguage = () => {
    if (selectedLanguagesAndLevels.length < 3) {
      const updatedLanguagesAndLevels = [
        ...selectedLanguagesAndLevels,
        { language: null, skillLevels: [] },
      ];
      setSelectedLanguagesAndLevels(updatedLanguagesAndLevels);
      handleSkillLevelsChange([], updatedLanguagesAndLevels.length - 1);
    }
  };

  const handleRemoveLanguage = (index: number) => {
    const updatedLanguagesAndLevels = [...selectedLanguagesAndLevels];
    updatedLanguagesAndLevels.splice(index, 1);
    setSelectedLanguagesAndLevels(updatedLanguagesAndLevels);
  };

  return (
    <>
      {selectedLanguagesAndLevels.length === 0 && (
        <LanguageLevel
          pageName={pageName}
          languages={languagesData}
          selectedLanguage={null}
          initialLanguageAndLevels={initialLanguageAndLevels}
          selectedSkillLevels={[]}
          onLanguageChange={(language) => handleLanguageChange(language, 0)}
          onSkillLevelsChange={(skillLevels) =>
            handleSkillLevelsChange(skillLevels, 0)
          }
          onReset={() => handleReset(0)}
          onRemoveLanguage={() => handleRemoveLanguage(0)}
        />
      )}
      {selectedLanguagesAndLevels.map((item, index) => (
        <LanguageLevel
          pageName={pageName}
          key={index}
          languages={languagesData.filter(
            (lang) => !selectedLanguages.includes(lang),
          )}
          selectedLanguage={item.language || selectedLanguage}
          initialLanguageAndLevels={initialLanguageAndLevels}
          selectedSkillLevels={item.skillLevels}
          onLanguageChange={(language) => handleLanguageChange(language, index)}
          onSkillLevelsChange={(skillLevels) =>
            handleSkillLevelsChange(skillLevels, index)
          }
          onReset={() => handleReset(index)}
          onRemoveLanguage={() => handleRemoveLanguage(index)}
        />
      ))}
      {selectedLanguagesAndLevels.length < 3 && (
        <div
          className={cn(
            styles.languagesAdd,
            pageName === 'Sort' ? styles.languagesAdd_center : '',
          )}
        >
          <Button
            variant='addLanguage'
            size='small'
            fontSize='15'
            onClick={handleAddLanguage}
            className={styles.languagesAdd__button}
          >
            {'добавить язык'}
          </Button>
        </div>
      )}
    </>
  );
};

export default LanguageModule;
