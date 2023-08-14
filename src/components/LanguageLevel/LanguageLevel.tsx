import React, { useState } from "react";
import styles from "../../components/LanguageLevel/LanguageLevel.module.scss";
import { Language, UserForeignLanguage, UserNativeLanguage } from '../../utils/openapi';

// Определение перечисления для уровней владения языком
export enum SkillLevelEnum {
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
    if (language) {
      setSelectedLanguage(language);
      console.log("Выбран язык:", language.name);
    } else {
      setSelectedLanguage(null);
      console.log("Язык не найден:", languageName);
    }
  };

  // Обработчик изменения выбранного уровня владения
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Получаем значение выбранного уровня владения
    const skillLevel = e.target.value as keyof typeof SkillLevelEnum;
     
    // Получаем код языка (название)
    const languageCode = e.target.name;

    // Находим объект языка в списке доступных языков
    const language = languages.find((lang) => lang.name === languageCode);
  
    // Проверяем, найден ли язык
    if (language) {
      console.log("Выбран язык:", language.name);
      // Если выбран носитель языка
      if (skillLevel === SkillLevelEnum.Native) {

        // Создаем объект для носителя языка
        const userLanguage: UserNativeLanguage = {          
          language: language.name,
          isocode: language.isocode,
        };

          // Проверяем, была ли галочка установлена
        if (e.target.checked) {

           // Проверяем, что количество выбранных уровней меньше 3
          if (selectedLevels.length < 3) {
             // Добавляем язык в список и обновляем состояние
            onAdd(userLanguage);
            setSelectedLevels((prevLevels) => [...prevLevels, userLanguage]);
            console.log("Добавлен носитель языка:", userLanguage.language);
          } else {
            console.log("Нельзя выбрать более 3 уровней");
          }
        } else {

          // Удаляем язык из списка и обновляем состояние
          onRemove?.(userLanguage);
          setSelectedLevels((prevLevels) =>
            prevLevels.filter((lang) => lang.language !== language.name)
          );
          console.log("Удален носитель языка:", userLanguage.language);
        }
      } else {

        // Если выбран иностранный язык
        const userLanguage: UserForeignLanguage = {
          language: language.name,
          isocode: language.isocode,
          skill_level: SkillLevelEnum,
        };        
  
        // Проверяем, была ли галочка установлена
        if (e.target.checked) {
          
          // Проверяем, что количество выбранных языков с уровнем владения меньше 5
          if (
            selectedLevels.filter(
              (lang) => "skill_level" in lang && lang.skill_level
            ).length < 5
          ) {

            // Добавляем язык в список и обновляем состояние
            onAdd(userLanguage);
            setSelectedLevels((prevLevels) => [...prevLevels, userLanguage]);
            console.log(
              "Добавлен иностранный язык:",
              userLanguage.language,
              "Уровень владения:",
              userLanguage.skill_level
            );
          } else {
            console.log("Нельзя выбрать более 5 языков с уровнем владения");
          }
        } else {

          // Удаляем язык из списка и обновляем состояние
          onRemove?.(userLanguage);
          setSelectedLevels((prevLevels) =>
            prevLevels.filter((lang) => lang.language !== language.name)
          );
          console.log(
            "Удален иностранный язык:",
            userLanguage.language,
            "Уровень владения:",
            userLanguage.skill_level
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
