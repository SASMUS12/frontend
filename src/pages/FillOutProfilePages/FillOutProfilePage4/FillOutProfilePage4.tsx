import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import Header from "../../../components/Header/Header";
import ProgressLine from "../../../components/UI/ProgressLine/ProgressLine";
import { Button } from "../../../components/UI/Button/Button";
import { Goals } from "./Goals";

import { useModel } from "./model";

import styles from "../FillOutProfilePages.module.scss";

const FillOutProfilePage4 = () => {
  const model = useModel();

  console.log(model.selectedGoals);
  console.log(model.isSubmitButtonDisabled);

  useEffect(() => {
    model.handleCurrentUser();
  }, []);

  useEffect(() => {
    model.handleSubmitButtonDisabled();
  }, [model.selectedGoals]);

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
          <ProgressLine pageNumber={4} />
          <h1 className={styles.container__title}>Укажите ваши цели</h1>
          <form className={styles.form} onSubmit={model.handleSubmit}>
            <div className={styles.container__goals}>
              {Goals.map((goal, index) => (
                <button
                  type="button"
                  key={index}
                  className={styles.container__goals_goal}
                  onClick={(event) => {
                    model.handleGoalButtonClick(event, goal);
                  }}
                >
                  <img src={goal.image} alt={goal.name} />
                  <span>{goal.description}</span>
                </button>
              ))}
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
export default observer(FillOutProfilePage4);
