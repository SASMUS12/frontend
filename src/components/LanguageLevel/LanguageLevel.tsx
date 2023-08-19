import React, { useState } from "react";
import { SkillLevelEnum } from "../../utils/openapi";
import Select from "react-select";
import { Language } from '../../utils/openapi';

const skillLevelNames: Record<SkillLevelEnum, string> = {
  [SkillLevelEnum.Newbie]: "Новичок",
  [SkillLevelEnum.Amateur]: "Любитель",
  [SkillLevelEnum.Profi]: "Профи",
  [SkillLevelEnum.Expert]: "Эксперт",
  [SkillLevelEnum.Guru]: "Гуру",
  [SkillLevelEnum.Native]: "Носитель",
};

interface LanguageSelectionProps {
  languagesData: Language[];
  onLanguageSelect: (language: Language, skillLevel: SkillLevelEnum) => void;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ languagesData, onLanguageSelect }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedSkillLevels, setSelectedSkillLevels] = useState<SkillLevelEnum[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  const handleSkillLevelChange = (skillLevel: SkillLevelEnum) => {
    if (selectedSkillLevels.includes(skillLevel)) {
      setSelectedSkillLevels((prevSelectedSkillLevels) =>
        prevSelectedSkillLevels.filter((level) => level !== skillLevel)
      );
    } else {
      if (selectedSkillLevels.length < 3) {
        setSelectedSkillLevels((prevSelectedSkillLevels) => [...prevSelectedSkillLevels, skillLevel]);
      }
    }
  };

  const handleAddLanguage = () => {
    if (selectedLanguage) {
      onLanguageSelect(selectedLanguage, selectedSkillLevels[selectedSkillLevels.length - 1]);
      setSelectedLanguage(null);
      setSelectedSkillLevels([]);
    }
  };

  const languageOptions = languagesData.map((language) => ({
    value: language,
    label: language.name,
  }));

  return (
    <div>
      <div>
        <Select
          options={languageOptions}
          value={selectedLanguage}
          placeholder="Выберите язык"
          onChange={(selectedOption) => setSelectedLanguage(selectedOption?.value || null)}
          onMenuOpen={() => setIsOpen(true)}
          onMenuClose={() => setIsOpen(false)}
          isSearchable
          menuIsOpen={isOpen}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
        />
      </div>
      <div>
        {Object.values(skillLevelNames).map((level) => (
          <label key={level}>
            <input
              type="checkbox"
              value={level}
              checked={selectedSkillLevels.includes(level)}
              onChange={() => handleSkillLevelChange(level as SkillLevelEnum)}
            />
            {level}
          </label>
        ))}
      </div>
      <button onClick={handleAddLanguage}>Добавить язык</button>
    </div>
  );
};

export default LanguageSelection;
