import React, { useState } from "react";
import styles from "../../components/LanguageLevel/LanguageLevel.module.scss";
import { Language, UserForeignLanguage, UserNativeLanguage } from '../../utils/openapi';

// Определение перечисления для уровней владения языком
enum SkillLevelEnum {
  Newbie = "Newbie",
  Amateur = "Amateur",
  Profi = "Profi",
  Expert = "Expert",
  Guru = "Guru",
  Native = "Native",
}

// Названия уровней владения языком на русском
const skillLevelNames: Record<SkillLevelEnum, string>  = {
  [SkillLevelEnum.Newbie]: "Новичок",
  [SkillLevelEnum.Amateur]: "Любитель",
  [SkillLevelEnum.Profi]: "Профи",
  [SkillLevelEnum.Expert]: "Эксперт",
  [SkillLevelEnum.Guru]: "Гуру",
  [SkillLevelEnum.Native]: "Носитель",
};

interface LanguageLevelProps {
  languages: Language[];
  onAdd: (language: UserForeignLanguage | UserNativeLanguage) => void;
  onRemove?: (language: UserForeignLanguage | UserNativeLanguage) => void;
}

const LanguageLevel: React.FC<LanguageLevelProps> = ({ languages, onAdd, onRemove }) => {

  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedLevels, setSelectedLevels] = useState<(UserForeignLanguage | UserNativeLanguage)[]>([]);

  // Обработчик изменения выбранного языка
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const languageName = e.target.value;
    const language = languages.find((lang) => lang.name === languageName);
    setSelectedLanguage(language || null);
  };

  // Обработчик изменения выбранного уровня владения
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillLevel = e.target.value as keyof typeof SkillLevelEnum;
    const languageCode = e.target.name;
    const language = languages.find((lang) => lang.name === languageCode);
  
    if (language) {
      if (skillLevel === SkillLevelEnum.Native) {
        const userLanguage: UserNativeLanguage = {
          language: language.name,
          isocode: language.isocode,
        };
  
        if (e.target.checked) {
          if (selectedLevels.length < 3) {
            onAdd(userLanguage);
            setSelectedLevels((prevLevels) => [...prevLevels, userLanguage]);
          } else {
            console.log("Нельзя выбрать более 3 уровней");
          }
        } else {
          onRemove?.(userLanguage);
          setSelectedLevels((prevLevels) =>
            prevLevels.filter((lang) => lang.language !== language.name)
          );
        }
      } else {
        const userLanguage: UserForeignLanguage = {
          language: language.name,
          isocode: language.isocode,
          skill_level: SkillLevelEnum,
        };        
  
        if (e.target.checked) {
          if (
            selectedLevels.filter(
              (lang) => "skill_level" in lang && lang.skill_level
            ).length < 5
          ) {
            onAdd(userLanguage);
            setSelectedLevels((prevLevels) => [...prevLevels, userLanguage]);
          } else {
            console.log("Нельзя выбрать более 5 языков с уровнем владения");
          }
        } else {
          onRemove?.(userLanguage);
          setSelectedLevels((prevLevels) =>
            prevLevels.filter((lang) => lang.language !== language.name)
          );
        }
      }
    } else {
      console.log("Язык не найден:", languageCode);
    }
  };

  return (
    <>
      <div className={styles.language__option}>
        <select value={selectedLanguage?.name || ''} onChange={handleSelectChange}>
          {languages.map((language) => (
            <option key={language.isocode} value={language.name}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.language__level}>
        {Object.entries(SkillLevelEnum).map(([key, value]) => (
          <label key={value}>
            <input
              type="checkbox"
              name={key}
              value={SkillLevelEnum[value]}
              onChange={handleCheckboxChange}
              disabled={
                (value === SkillLevelEnum.Native && selectedLevels.length >= 3) ||
                (value !== SkillLevelEnum.Native &&
                  selectedLevels.filter(
                    (lang) => "skill_level" in lang && lang.skill_level === SkillLevelEnum[value]
                  ).length >= 5)
              }
            />
            <span className={styles.languageLevel_checkbox_visible}></span>
            {skillLevelNames[value]}
          </label>
        ))}
      </div>
    </>
  );
};

export default LanguageLevel;
