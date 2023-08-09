import React, { useState } from "react";
import styles from "../../components/LanguageLevel/LanguageLevel.module.scss";
import { Language, UserForeignLanguage, UserNativeLanguage } from '../../utils/openapi';

enum SkillLevelEnum {
  Newbie = "Newbie",
  Amateur = "Amateur",
  Profi = "Profi",
  Expert = "Expert",
  Guru = "Guru",
}

interface LanguageLevelProps {
  languages: Language[];
  onAdd: (language: UserForeignLanguage | UserNativeLanguage) => void;
  onRemove?: (language: UserForeignLanguage | UserNativeLanguage) => void;
}

const LanguageLevel: React.FC<LanguageLevelProps> = ({ languages, onAdd, onRemove }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const languageName = e.target.value;
    const language = languages.find((lang) => lang.name === languageName);
    setSelectedLanguage(language || null);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillLevel = e.target.value;
    const languageCode = e.target.name;
    const language = languages.find((lang) => lang.name === languageCode);
  
    if (language) {
      if (skillLevel === "Native") {
        const userLanguage: UserNativeLanguage = {
          code: language.isocode,
          language: language.name,
        };
  
        if (e.target.checked) {
          onAdd(userLanguage);
          setSelectedLevels((prevLevels) => [...prevLevels, skillLevel]);
        } else {
          onRemove?.(userLanguage);
          setSelectedLevels((prevLevels) => prevLevels.filter((level) => level !== skillLevel));
        }
      } else {
        const userLanguage: UserForeignLanguage = {
          code: language.isocode,
          language: language.name,
          skill_level: skillLevel as SkillLevelEnum,
        };
  
        if (e.target.checked) {
          onAdd(userLanguage);
        } else {
          onRemove?.(userLanguage);
        }
      }
    }
  };

    return(
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
              <label>
                <input type="checkbox" name="Новичок" value="Newbie" onChange={handleCheckboxChange} />
                <span className={styles.languageLevel_checkbox_visible}></span>
                Новичок
              </label>
              <label>
                <input type="checkbox" name="Любитель" value="Amateur" onChange={handleCheckboxChange} />
                <span className={styles.languageLevel_checkbox_visible}></span>
                Любитель
              </label>
              <label>
                <input type="checkbox" name="Профи"  value="Profi"onChange={handleCheckboxChange} />
                <span className={styles.languageLevel_checkbox_visible}></span>
                  Профи
              </label>
              <label>
                <input type="checkbox" name="Эксперт" value="Expert" onChange={handleCheckboxChange} />
                <span className={styles.languageLevel_checkbox_visible}></span>
                 Эксперт
              </label>
              <label>
               <input type="checkbox" name="Гуру" value="Guru" onChange={handleCheckboxChange} />
               <span className={styles.languageLevel_checkbox_visible}></span>
                 Гуру
              </label>
              <label>
                <input type="checkbox" name="Носитель" value="Native"onChange={handleCheckboxChange} />
                <span className={styles.languageLevel_checkbox_visible}></span>
                 Носитель
              </label>
            </div>
        </>
    )
}

export default LanguageLevel;