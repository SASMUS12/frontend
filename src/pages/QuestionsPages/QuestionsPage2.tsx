import {useMemo, useState} from "react";

import Header from "../../components/Header/Header";
import ProgressLine from "../../components/UI/ProgressLine/ProgressLine";
import QuestionArea from "../../components/UI/QuestionArea/QuestionArea";
import CountrySelection from "../../components/CountrySelection/CountrySelection";
import LanguageModule from "../../components/LanguageModule/LanguageModule";

import {Language, SkillLevelEnum} from "../../utils/openapi";

import styles from './QuestionsPages.module.scss';

const QuestionsPage2 = () => {
    const initialLanguageAndLevels = useMemo(() => {
        return { language: null, skillLevels: [] };
    }, []);

    const [selectedLanguagesAndLevels, setSelectedLanguagesAndLevels] = useState<
        { language: Language | null; skillLevels: SkillLevelEnum[] }[]
    >([initialLanguageAndLevels]);

    return (
        <>
            <Header/>
            <main className={styles.content}>
                <div className={styles.container}>
                    <ProgressLine pageNumber={2}/>
                    <h1 className={styles.container__title}>Укажите страну и родной язык</h1>
                    <QuestionArea>
                        <h3 className={styles.container__questionArea_title}>Страна, в которой Вы сейчас живете</h3>
                        <CountrySelection />
                    </QuestionArea>
                    <QuestionArea>
                        <h3 className={styles.container__questionArea_title}>Ваш родной язык, язык на котором Вы
                            свободно говорите</h3>
                        <LanguageModule
                            pageName="Sort"
                            initialLanguageAndLevels={initialLanguageAndLevels}
                            selectedLanguagesAndLevels={selectedLanguagesAndLevels}
                            setSelectedLanguagesAndLevels={setSelectedLanguagesAndLevels}
                        />
                    </QuestionArea>
                </div>
            </main>
        </>
    );
};

export default QuestionsPage2;
