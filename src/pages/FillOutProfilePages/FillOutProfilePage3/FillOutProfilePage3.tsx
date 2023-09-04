import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../components/Header/Header";
import ProgressLine from "../../../components/UI/ProgressLine/ProgressLine";
import LanguageModule from "../../../components/LanguageModule/LanguageModule";
import { Button } from "../../../components/UI/Button/Button";

import { Language, SkillLevelEnum } from "../../../utils/openapi";

import styles from "../FillOutProfilePages.module.scss";
import cn from "classnames";

const FillOutProfilePage3 = () => {
  const model = useModel();

  const initialLanguageAndLevels = useMemo(() => {
    return { language: null, skillLevels: [] };
  }, []);

  useEffect(() => {
    model.handleSubmitButtonDisabled();
  }, [model.languagesAndLevels]);

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
          <ProgressLine pageNumber={3} />
          <h1 className={styles.container__title}>Выберите изучаемые языки</h1>
          <form className={styles.form} onSubmit={model.handleSubmit}>
            <div
              className={cn(
                styles.container__fillOutProfileArea,
                styles.container__fillOutProfileArea_page3,
              )}
            >
              <LanguageModule
                pageName='FillOutProfile3'
                initialLanguageAndLevels={initialLanguageAndLevels}
                selectedLanguagesAndLevels={model.languagesAndLevels}
                setSelectedLanguagesAndLevels={model.handleLanguagesValue}
              />
              <button
                className={styles.container__fillOutProfileArea_button}
                onClick={handleHelpButtonClick}
                type='button'
              >
                Уровни языка
              </button>
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

        <LanguageLevelModal
          isModalOpen={model.isHelpModalOpen}
          setModalOpen={model.handleModalClose}
          pageName="FillOutProfile3"
        />
      </main>
    </>
  );
};

export default observer(FillOutProfilePage3);
