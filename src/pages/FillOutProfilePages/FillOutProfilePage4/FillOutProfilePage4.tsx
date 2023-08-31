import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../components/Header/Header";
import ProgressLine from "../../../components/UI/ProgressLine/ProgressLine";
import { Button } from "../../../components/UI/Button/Button";
import { Goals } from "./Goals";

import styles from "../FillOutProfilePages.module.scss";

const FillOutProfilePage4 = () => {
  const navigate = useNavigate();

  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const [selectedGoals, setSelectedGoals] = useState<
    {
      image: string;
      name: string;
      description: string;
      active: boolean;
    }[]
  >([]);

  console.log(selectedGoals);
  console.log(isSubmitButtonDisabled);

  const handleSubmitButtonDisabled = () => {
    selectedGoals.length === 0
      ? setSubmitButtonDisabled(true)
      : setSubmitButtonDisabled(false);
  };

  useEffect(() => {
    handleSubmitButtonDisabled();
  }, [selectedGoals]);

  const handleReturnButtonClick = () => {
    navigate("/fill-out-3");
  };

  const handleGoalButtonClick = (event, goal, index) => {
    const updatedGoals = [...selectedGoals];

    console.log(goal.active);

    if (!goal.active) {
      goal.active = true;
      updatedGoals.push(goal);
      setSelectedGoals(updatedGoals);
      event.currentTarget.classList.add(styles.container__goals_goal_active);
    } else {
      goal.active = false;
      const updatedGoals = selectedGoals.filter(
        (selectedGoal) => selectedGoal.active
      );
      setSelectedGoals(updatedGoals);
      event.currentTarget.classList.remove(styles.container__goals_goal_active);
    }
  };
  const handleFillOutPage4 = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/fill-out-5");
    console.log("FillOutPage4");
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
          <ProgressLine pageNumber={4} />
          <h1 className={styles.container__title}>Укажите ваши цели</h1>
          <form className={styles.form} onSubmit={handleFillOutPage4}>
            <div className={styles.container__goals}>
              {Goals.map((goal, index) => (
                <button
                  type="button"
                  key={index}
                  className={styles.container__goals_goal}
                  onClick={(event) => {
                    handleGoalButtonClick(event, goal, index);
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
export default FillOutProfilePage4;
