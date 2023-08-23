import {FC, useEffect, useMemo, useState} from "react";

import LanguageLevel from "../LanguageLevel/LanguageLevel";
import {Button} from "../UI/Button/Button";

import {Language, SkillLevelEnum} from "../../utils/openapi";
import {api} from "../../utils/constants";

import styles from "./LanguageModule.module.scss";
import cn from "classnames";

interface LanguageModuleProps {
    pageName: string;
    initialLanguageAndLevels: { language: Language | null; skillLevels: SkillLevelEnum[] };
    selectedLanguagesAndLevels: { language: Language | null; skillLevels: SkillLevelEnum[] }[]; // Вот этот пропс
    setSelectedLanguagesAndLevels: (languagesAndLevels: { language: Language | null; skillLevels: SkillLevelEnum[] }[]) => void;
  }
const LanguageModule: FC<LanguageModuleProps> = ({pageName, initialLanguageAndLevels, selectedLanguagesAndLevels, setSelectedLanguagesAndLevels}) => {
    const [languagesData, setLanguagesData] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedSkillLevels, setSelectedSkillLevels] = useState<SkillLevelEnum[]>([]);


    //Запрос массива языков
    const fetchLanguagesData = async () => {
        try {
            console.log('отправка запроса ---');
            const response = await api.api.languagesList();
            console.log('ответ получен -', response);
            const languages = response.data;
            setLanguagesData(languages);
        } catch (error) {
            console.error("Ошибка при получении данных о языках:", error);
        }
    };

    useEffect(() => {
        fetchLanguagesData();
    }, []);

    const handleAddLanguageAndLevel = (language: Language, skillLevels: SkillLevelEnum[]) => {
        const existingLanguageIndex = selectedLanguagesAndLevels.findIndex(
          lang => lang.language?.isocode === language.isocode
        );
    
        if (existingLanguageIndex === -1) {
          setSelectedLanguagesAndLevels([...selectedLanguagesAndLevels, { language, skillLevels }]);
        } else {
          const updatedLanguagesAndLevels = [...selectedLanguagesAndLevels];
          updatedLanguagesAndLevels[existingLanguageIndex].skillLevels = skillLevels;
          setSelectedLanguagesAndLevels(updatedLanguagesAndLevels);
        }
      };

    const handleRemoveLanguage = (index: number) => {
        setSelectedLanguagesAndLevels((prevLanguages) => {
          const updatedLanguages = [...prevLanguages];
          updatedLanguages.splice(index, 1);
          return updatedLanguages;
        });
      };

    return (
        <>
            {selectedLanguagesAndLevels.map((item, index) => (
                <LanguageLevel
                    pageName={pageName}
                    key={index}
                    languages={languagesData}
                    selectedLanguage={item.language}
                    initialLanguageAndLevels={initialLanguageAndLevels}
                    selectedSkillLevels={item.skillLevels}
                    onLanguageChange={(language) => {
                        const updatedLanguagesAndLevels = [...selectedLanguagesAndLevels];
                        updatedLanguagesAndLevels[index].language = language;
                        setSelectedLanguagesAndLevels(updatedLanguagesAndLevels);
                    }}
                    onSkillLevelsChange={(skillLevels) => {
                        const updatedLanguagesAndLevels = [...selectedLanguagesAndLevels];
                        updatedLanguagesAndLevels[index].skillLevels = skillLevels;
                        setSelectedLanguagesAndLevels(updatedLanguagesAndLevels);
                    }}
                    onReset={() => {
                        const updatedLanguagesAndLevels = [...selectedLanguagesAndLevels];
                        updatedLanguagesAndLevels[index].language = null;
                        updatedLanguagesAndLevels[index].skillLevels = [];
                        setSelectedLanguagesAndLevels(updatedLanguagesAndLevels);
                    }}
                    onRemoveLanguage={() => handleRemoveLanguage(index)}
                />
            ))}
            {selectedLanguagesAndLevels.length < 3 && (
                <div className={cn(styles.languagesAdd, pageName === "Sort" ? styles.languagesAdd_center : "")}>
                    <Button
                        variant="addLanguage"
                        size="xs"
                        fontSize="15"
                        onClick={() => {
                            const updatedLanguagesAndLevels = [...selectedLanguagesAndLevels];
                            updatedLanguagesAndLevels.push({language: null, skillLevels: []});
                            setSelectedLanguagesAndLevels(updatedLanguagesAndLevels);
                        }}
                        className={styles.languagesAdd__button}
                    >
                        {"добавить язык"}
                    </Button>
                </div>
            )}
        </>
    );
};

export default LanguageModule;