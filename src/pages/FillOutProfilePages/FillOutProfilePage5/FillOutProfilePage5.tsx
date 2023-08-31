import { observer } from "mobx-react-lite";

import Header from "../../../components/Header/Header";
import ProgressLine from "../../../components/UI/ProgressLine/ProgressLine";
import { Button } from "../../../components/UI/Button/Button";
import CountriesAndInterestsSelection from "../../../components/InterestsSelection/InterestsSelection";

import { useModel } from "./model";

import styles from "../FillOutProfilePages.module.scss";

const FillOutProfilePage5 = () => {
  const model = useModel();

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
          <ProgressLine pageNumber={5} />
          <h1 className={styles.container__title}>Укажите Ваши интересы</h1>
          <form className={styles.form} onSubmit={model.handleSubmit}>
            <CountriesAndInterestsSelection
              pageName="FillOutProfile5"
              itemsName="interests"
              selectedItems={model.selectedInterests}
              setSelectedItems={model.setSelectedInterests}
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
