import React, { useState, useMemo } from 'react';
import styles from '../Sort/Sort.module.scss';
import CountrySelection from '../CountrySelection/CountrySelection';
import LanguageModule from '../LanguageModule/LanguageModule';
import Gender from '../Gender/Gender';
import MultiRangeSlider from '../MultiRangeSlider/MultiRangeSlider';
import LanguageLevelModal from '../LanguageLevelModal/LanguageLevelModal';
import { Button } from '../UI/Button/Button';

import { Country, Language, SkillLevelEnum } from '../../utils/openapi';

interface Filters {
  country: string;
  languages: {
    language: string;
    skill_level: string;
  }[];
  gender: string | null;
  age: string;
}

interface SortProps {
  onChangeSort: (sortType: any) => void;
  isOpen: boolean;
}

const Sort: React.FC<SortProps> = ({ onChangeSort, isOpen }) => {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [selectedLanguagesAndLevels, setSelectedLanguagesAndLevels] = useState<
    { language: Language | null; skillLevels: SkillLevelEnum[] }[]
  >([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showDefaultLanguageModule, setShowDefaultLanguageModule] =
    useState(true);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [leftValue, setLeftValue] = useState<number>(18);
  const [rightValue, setRightValue] = useState<number>(40);

  const initialLanguageAndLevels = useMemo(() => {
    return { language: null, skillLevels: [] };
  }, []);

  const handleSliderChange = (left: number, right: number) => {
    setLeftValue(left);
    setRightValue(right);
  };

  const handleClearFilter = () => {
    setSelectedCountries([]);
    setSelectedLanguagesAndLevels([initialLanguageAndLevels]);
    setSelectedGender(null);
    setLeftValue(18);
    setRightValue(40);
  };

  const handleFindButtonClick = () => {
    const ageRange = `${leftValue},${rightValue}`;
    const languageFilters = selectedLanguagesAndLevels
      .filter((item) => item.language !== null && item.skillLevels.length > 0)
      .map((item) => ({
        language: item.language!.name,
        skill_level: item.skillLevels.join(','),
      }));
    const countryCodes = selectedCountries
      .filter((country) => country.code !== null)
      .map((country) => country.code!.toUpperCase())
      .join(',');
    const filters: Filters = {
      age: ageRange,
      country: countryCodes,
      gender: selectedGender || null,
      languages: languageFilters,
    };
    onChangeSort(filters);
  };
  return (
    <div className={isOpen ? styles.popup__sort : styles.popup__sort_hidden}>
      <div className={styles.popup__cantry}>
        <h2 className={styles.subtitle}>Страна партнера</h2>
        <CountrySelection
          pageName='Sort'
          onSelectedCountriesChange={setSelectedCountries}
          onClearFilter={handleClearFilter}
        />
      </div>
      <div className={styles.languageHelp}>
        <h2 className={styles.subtitle}>Язык партнера</h2>
        <Button
          className={styles.languageHelp__button}
          onClick={() => setModalOpen(true)}
        />
      </div>
      {showDefaultLanguageModule && (
        <LanguageModule
          pageName='Sort'
          initialLanguageAndLevels={{ language: null, skillLevels: [] }}
          selectedLanguagesAndLevels={selectedLanguagesAndLevels}
          setSelectedLanguagesAndLevels={setSelectedLanguagesAndLevels}
        />
      )}
      <div className={styles.partner}>
        <h2 className={styles.subtitle}>О партнере</h2>
        <div className={styles.partner__gender}>
          <h3 className={styles.partner__gender_subtitle}>Пол</h3>
          <Gender
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            componentName='Sort'
          />
        </div>
      </div>
      <div className={styles.age}>
        <h3 className={styles.age__subtitle}>Возраст</h3>
        <MultiRangeSlider
          minValue={18}
          maxValue={90}
          leftValue={leftValue}
          rightValue={rightValue}
          onChange={handleSliderChange}
        />
      </div>
      <Button
        type='button'
        className={styles.findButton}
        children={'Найти'}
        onClick={handleFindButtonClick}
      />
      <Button
        type='submit'
        variant='transparent'
        size='small'
        fontSize='13'
        className={styles.cleanButton}
        children={'Очистить фильтр'}
        onClick={handleClearFilter}
      />
      <LanguageLevelModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        pageName='Sort'
      />
    </div>
  );
};

export default Sort;
