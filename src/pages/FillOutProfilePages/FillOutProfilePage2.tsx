import React, {FormEvent, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

import Header from "../../components/Header/Header";
import ProgressLine from "../../components/UI/ProgressLine/ProgressLine";
import LanguageModule from "../../components/LanguageModule/LanguageModule";
import {Button} from "../../components/UI/Button/Button";
import CountrySelection from "../../components/CountrySelection/CountrySelection";

import {Country, Language, SkillLevelEnum} from "../../utils/openapi";

import styles from './FillOutProfilePages.module.scss';


const FillOutProfilePage2 = () => {
    const navigate = useNavigate();

    const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true);
    const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

    const initialLanguageAndLevels = useMemo(() => {
        return {language: null, skillLevels: []};
    }, []);

    const [selectedLanguagesAndLevels, setSelectedLanguagesAndLevels] = useState<
        { language: Language | null; skillLevels: SkillLevelEnum[] }[]
    >([initialLanguageAndLevels]);

    const handleReturnButtonClick = () => {
        navigate("/fill-out-1");
    }

    const handleSubmitButtonDisabled = () => {
        for (let i = 0; i < selectedLanguagesAndLevels.length; i++) {
            selectedLanguagesAndLevels[i].language === null
                ? setSubmitButtonDisabled(true)
                : setSubmitButtonDisabled(false)
        }
    }

    useEffect(() => {
        handleSubmitButtonDisabled();
    }, [selectedLanguagesAndLevels]);

    const handleFillOutPage2 = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate("/fill-out-3");
        console.log("FillOutPage2");
    };

    return (
        <>
            <Header/>
            <main className={styles.content}>
                <button className={styles.content__returnButton}
                        onClick={handleReturnButtonClick}>Назад
                </button>
                <div className={styles.container}>
                    <ProgressLine pageNumber={2}/>
                    <h1 className={styles.container__title}>Укажите страну и родной язык</h1>
                    <form className={styles.form} onSubmit={handleFillOutPage2}>
                        <div className={styles.container__fillOutProfileArea}>
                            <h3 className={styles.container__fillOutProfileArea_title}>
                                Страна, в которой Вы сейчас живете
                            </h3>
                            <CountrySelection
                                pageName="FillOutProfile2"
                                onSelectedCountriesChange={setSelectedCountries}
                            />
                        </div>
                        <div className={styles.container__fillOutProfileArea}>
                            <h3 className={styles.container__fillOutProfileArea_title}>
                                Ваш родной язык, язык на котором Вы свободно говорите
                            </h3>
                            <LanguageModule
                                pageName="FillOutProfile2"
                                initialLanguageAndLevels={initialLanguageAndLevels}
                                selectedLanguagesAndLevels={selectedLanguagesAndLevels}
                                setSelectedLanguagesAndLevels={setSelectedLanguagesAndLevels}
                            />
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
            </main>
        </>
    );
};

export default observer(FillOutProfilePage2);
