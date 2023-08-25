import React, {FormEvent, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

import Header from "../../components/Header/Header";
import ProgressLine from "../../components/UI/ProgressLine/ProgressLine";
import LanguageModule from "../../components/LanguageModule/LanguageModule";
import {Button} from "../../components/UI/Button/Button";

import {Language, SkillLevelEnum} from "../../utils/openapi";

import styles from "./FillOutProfilePages.module.scss";
import cn from "classnames";
import LanguageLevelModal from "../../components/LanguageLevelModal/LanguageLevelModal";

const FillOutProfilePage1 = () => {
    const navigate = useNavigate();

    const [isModalOpen, setModalOpen] = useState(false);
    const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true);

    const initialLanguageAndLevels = useMemo(() => {
        return {language: null, skillLevels: []};
    }, []);

    const [selectedLanguagesAndLevels, setSelectedLanguagesAndLevels] = useState<
        { language: Language | null; skillLevels: SkillLevelEnum[] }[]
    >([initialLanguageAndLevels]);

    const handleSubmitButtonDisabled = () => {
        for (let i = 0; i < selectedLanguagesAndLevels.length; i++) {
            selectedLanguagesAndLevels[i].language === null || selectedLanguagesAndLevels[i].skillLevels.toString() === [].toString()
                ? setSubmitButtonDisabled(true)
                : setSubmitButtonDisabled(false)
        }
    }

    useEffect(() => {
        handleSubmitButtonDisabled();
    }, [selectedLanguagesAndLevels]);

    const handleReturnButtonClick = () => {
        navigate("/fill-out-2");
    }

    const handleHelpButtonClick = () => {
        setModalOpen(true);
    }

    const handleFillOutPage3 = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate("/fill-out-4");
        console.log("FillOutPage3");
    };

    return (
        <>
            <Header/>
            <main className={styles.content}>
                <button className={styles.content__returnButton}
                        onClick={handleReturnButtonClick}>Назад
                </button>
                <div className={styles.container}>
                    <ProgressLine pageNumber={3}/>
                    <h1 className={styles.container__title}>Выберите изучаемые языки</h1>
                    <form className={styles.form} onSubmit={handleFillOutPage3}>
                        <div className={cn(styles.container__fillOutProfileArea, styles.container__fillOutProfileArea_page3)}>
                            <LanguageModule
                                pageName="FillOutProfile3"
                                initialLanguageAndLevels={initialLanguageAndLevels}
                                selectedLanguagesAndLevels={selectedLanguagesAndLevels}
                                setSelectedLanguagesAndLevels={setSelectedLanguagesAndLevels}
                            />
                            <button className={styles.container__fillOutProfileArea_button}
                                    onClick={handleHelpButtonClick}
                                    type="button"
                            >Уровни языка</button>
                        </div>
                        <Button
                            className={styles.form__button}
                            type="submit"
                            variant="primary"
                            disabled={isSubmitButtonDisabled}
                        >
                            Продолжить
                        </Button>
                    </form>
                </div>

                <LanguageLevelModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} pageName="FillOutProfile3"/>
            </main>
        </>
    );
};

export default FillOutProfilePage1;
