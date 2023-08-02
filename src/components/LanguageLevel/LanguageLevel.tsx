import React from "react";
import styles from "../../components/LanguageLevel/LanguageLevel.module.scss"

export interface Language {
  id: number;
  name: string;
}

interface LanguageLevelProps {
  languages: Language[];
  onAdd: (language: Language) => void;
  onRemove?: (language: Language) => void;
}

const LanguageLevel: React.FC<LanguageLevelProps> = ({ languages, onAdd, onRemove }) => {

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const languageName = e.target.name;
    const language = languages.find((lang) => lang.name === languageName);
    if (e.target.checked && language) {
      onAdd(language);
    } else {
      onRemove?.(language);
    }
  };

    return(
        <>
            <div className={styles.language__option}>
              <select >                
                {languages.map((language) => (
                  <option key={language.id}>{language.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.language__level}>
              <label>
                <input type="checkbox" name="Новичок" onChange={handleCheckboxChange} />
                Новичок
              </label>
              <label>
                <input type="checkbox" name="Любитель" onChange={handleCheckboxChange} />
                Любитель
              </label>
              <label>
                <input type="checkbox" name="Профи" onChange={handleCheckboxChange} />
                  Профи
              </label>
              <label>
                <input type="checkbox" name="Эксперт" onChange={handleCheckboxChange} />
                 Эксперт
              </label>
              <label>
               <input type="checkbox" name="Гуру" onChange={handleCheckboxChange} />
                 Гуру
              </label>
              <label>
                <input type="checkbox" name="Носитель" onChange={handleCheckboxChange} />
                 Носитель
              </label>
            </div>
        </>
    )
}

export default LanguageLevel;