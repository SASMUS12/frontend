import React, { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";

import Header from "../../../components/Header/Header";
import ProgressLine from "../../../components/UI/ProgressLine/ProgressLine";
import LanguageModule from "../../../components/LanguageModule/LanguageModule";
import { Button } from "../../../components/UI/Button/Button";
import CountrySelection from "../../../components/CountrySelection/CountrySelection";

import { useModel } from "./model";

import styles from "../FillOutProfilePages.module.scss";
import { Language, SkillLevelEnum } from "../../../utils/openapi";

const FillOutProfilePage2 = () => {
  const model = useModel();

  const initialLanguageAndLevels = useMemo(() => {
    return { language: null, skillLevels: [] as SkillLevelEnum[] };
  }, []);

  useEffect(() => {
    model.handleCurrentUser();
  }, []);

  useEffect(() => {
    model.handleSubmitButtonDisabled();
  }, [model.languages]);

  return (
    <>
      <Header />
      <main className={styles.content}>
        <button
          className={styles.content__returnButton}
          onClick={model.handleReturnButtonClick}
        >
          Назад
        </button>
        <div className={styles.container}>
          <ProgressLine pageNumber={2} />
          <h1 className={styles.container__title}>
            Укажите страну и родной язык
          </h1>
          <form className={styles.form} onSubmit={model.handleSubmit}>
            <div className={styles.container__fillOutProfileArea}>
              <h3 className={styles.container__fillOutProfileArea_title}>
                Страна, в которой Вы сейчас живете
              </h3>
              <CountrySelection
                pageName="FillOutProfile2"
                selectedCountries={model.countries}
                setSelectedCountries={model.handleCountriesValue}
              />
            </div>
            <div className={styles.container__fillOutProfileArea}>
              <h3 className={styles.container__fillOutProfileArea_title}>
                Ваш родной язык, язык на котором Вы свободно говорите
              </h3>
              <LanguageModule
                pageName="FillOutProfile2"
                initialLanguageAndLevels={initialLanguageAndLevels}
                selectedLanguagesAndLevels={model.languagesAndLevels}
                setSelectedLanguagesAndLevels={model.handleLanguagesValue}
              />
            </div>
            <Button
              className={styles.form__button}
              type="submit"
              variant="primary"
              disabled={model.isSubmitButtonDisabled}
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
