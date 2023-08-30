import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Header from "../../components/Header/Header";
import ProgressLine from "../../components/UI/ProgressLine/ProgressLine";
import { Input } from "../../components/UI/Input/Input";
import { Button } from "../../components/UI/Button/Button";
import InterestsSelection from "../../components/CountriesAndInterestsSelection/CountriesAndInterestsSelection";

import { useModel } from "./model";

import styles from "./FillOutProfilePages.module.scss";
import { Interest } from "../../utils/openapi";

const FillOutProfilePage5 = () => {
  const model = useModel();
  const navigate = useNavigate();

  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);

  const handleReturnButtonClick = () => {
    navigate("/fill-out-4");
  };

  const handleFillOutPage5 = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/fill-out-6");
    console.log("FillOutPage5");
  };

  return (
    <>
      <Header />
      <main className={styles.content}>
        <button
          className={styles.content__returnButton}
          onClick={handleReturnButtonClick}
        >
          Назад
        </button>
        <div className={styles.container}>
          <ProgressLine pageNumber={5} />
          <h1 className={styles.container__title}>Укажите ваши интересы</h1>
          <form className={styles.form} onSubmit={handleFillOutPage5}>
            <InterestsSelection
              pageName="FillOutProfile5"
              itemsName="interests"
              onSelectedItemsChange={setSelectedInterests}
            />
            <Button
              className={styles.form__button}
              type="submit"
              variant="primary"
              disabled={false}
            >
              Продолжить
            </Button>
          </form>
        </div>
      </main>
    </>
  );
};

export default observer(FillOutProfilePage5);
