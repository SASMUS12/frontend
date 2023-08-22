import React, {useState, useEffect} from "react";

import {Language, SkillLevelEnum} from "../../utils/openapi";

import styles from "./LanguageLevel.module.scss";

const skillLevelNames: Record<SkillLevelEnum, string> = {
    [SkillLevelEnum.Newbie]: "Новичок",
    [SkillLevelEnum.Amateur]: "Любитель",
    [SkillLevelEnum.Profi]: "Профи",
    [SkillLevelEnum.Expert]: "Эксперт",
    [SkillLevelEnum.Guru]: "Гуру",
    [SkillLevelEnum.Native]: "Носитель",
};

interface LanguageLevelProps {
    pageName: string;
    languages: Language[];
    selectedLanguage: Language | null;
    selectedSkillLevels: SkillLevelEnum[];
    onLanguageChange: (language: Language | null) => void;
    onSkillLevelsChange: (skillLevels: SkillLevelEnum[]) => void;
    onReset: () => void;
    onRemoveLanguage: () => void;
    initialLanguageAndLevels: { language: Language | null; skillLevels: SkillLevelEnum[] };

}

const LanguageLevel: React.FC<LanguageLevelProps> = ({
                                                         pageName,
                                                         languages,
                                                         selectedLanguage,
                                                         selectedSkillLevels,
                                                         onLanguageChange,
                                                         onSkillLevelsChange,
                                                         onRemoveLanguage,
                                                         onReset,
                                                         initialLanguageAndLevels,
                                                     }) => {
    console.log("languagesData:", languages);
    console.log("selectedLanguage:", selectedLanguage);
    console.log("selectedSkillLevels:", selectedSkillLevels);


    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number | null>(null);

    const [language, setLanguage] = useState<Language | null>(initialLanguageAndLevels.language);
    const [skillLevels, setSkillLevels] = useState<SkillLevelEnum[]>(initialLanguageAndLevels.skillLevels);

    useEffect(() => {
        setLanguage(selectedLanguage);
        setSkillLevels(selectedSkillLevels);
    }, [selectedLanguage, selectedSkillLevels]);

    const filteredLanguages = languages.filter(
        (language) =>
            language.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            language.name_local.toLowerCase().includes(inputValue.toLowerCase())
    );

    const handleLanguageSelect = (language: Language) => {
        onLanguageChange(language);
        setInputValue(language.name);
        setIsOpen(false);
        setSelectedSuggestionIndex(null);
    };

    const handleSkillLevelChange = (skillLevel: SkillLevelEnum) => {
        if (selectedSkillLevels.includes(skillLevel)) {
            onSkillLevelsChange(selectedSkillLevels.filter((level) => level !== skillLevel));
        } else {
            if (skillLevel === SkillLevelEnum.Native) {
                onSkillLevelsChange([SkillLevelEnum.Native]);
            } else {
                if (
                    selectedSkillLevels.length < 3 &&
                    !selectedSkillLevels.includes(SkillLevelEnum.Native)
                ) {
                    onSkillLevelsChange([...selectedSkillLevels, skillLevel]);
                }
            }
        }
    };

    const sortedLanguages = filteredLanguages.sort((a, b) =>
        a.name.localeCompare(b.name, 'ru', {sensitivity: 'base'})
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedSuggestionIndex((prevIndex) => {
                if (prevIndex === null) {
                    return 0;
                } else if (prevIndex < sortedLanguages.length - 1) {
                    return prevIndex + 1;
                } else {
                    return prevIndex;
                }
            });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedSuggestionIndex((prevIndex) => {
                if (prevIndex === null) {
                    return sortedLanguages.length - 1;
                } else if (prevIndex > 0) {
                    return prevIndex - 1;
                } else {
                    return prevIndex;
                }
            });
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedSuggestionIndex !== null) {
                handleLanguageSelect(sortedLanguages[selectedSuggestionIndex]);
            } else if (inputValue.trim() !== '') {
                const matchedLanguage = sortedLanguages.find(language =>
                    language.name.toLowerCase() === inputValue.toLowerCase()
                );
                if (matchedLanguage) {
                    handleLanguageSelect(matchedLanguage);
                }
            }
            setIsOpen(false);
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
            if (inputValue === '' && selectedSuggestionIndex === null) {
                onLanguageChange(null);
            }
            setInputValue('');
            setSelectedSuggestionIndex(null);
            setIsOpen(false);
        }
    };

    const handleReset = () => {
        onReset();
        setInputValue('');
        setSelectedSuggestionIndex(null);
        setIsOpen(false);
        setLanguage(initialLanguageAndLevels.language);
        setSkillLevels(initialLanguageAndLevels.skillLevels);
    };

    return (
        <>
            <div className={styles.language}>
                <input
                    type="text"
                    className={styles.language__items}
                    value={selectedLanguage ? selectedLanguage.name : inputValue}
                    placeholder="Напишите или выберете"
                    onClick={() => setIsOpen(!isOpen)}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {isOpen && (
                    <div className={styles.language__languageList}>
                        {sortedLanguages.map((language, index) => (
                            <button
                                key={language.isocode}
                                className={styles.language__languageList_option}
                                role="option"
                                aria-selected={index === selectedSuggestionIndex}
                                onClick={() => {
                                    onLanguageChange(language);
                                    setInputValue(language.name);
                                    setIsOpen(false);
                                }}
                            >
                                {language.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.language__level}>
                {pageName === "Sort" &&
                    Object.entries(skillLevelNames).map(([key, level]) => (
                        <label key={level} className={styles.language__level_label}>
                            <input
                                type="checkbox"
                                value={level}
                                checked={selectedSkillLevels.includes(key as SkillLevelEnum)}
                                onChange={() => handleSkillLevelChange(key as SkillLevelEnum)}
                                className={styles.language__level_input}
                                disabled={
                                    (key === SkillLevelEnum.Native && selectedSkillLevels.length > 0) ||
                                    (key !== SkillLevelEnum.Native &&
                                        selectedSkillLevels.includes(SkillLevelEnum.Native))
                                }
                            />
                            <span className={styles.language__level_checkbox_visible}></span>
                            {level}
                        </label>
                    ))}
            </div>
        </>
    );
};

export default LanguageLevel;
