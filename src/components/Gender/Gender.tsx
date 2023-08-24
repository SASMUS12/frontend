import { Button } from "../UI/Button/Button";
import styles from "./Gender.module.scss";
import cn from "classnames";
import { GenderEnum } from "../../utils/openapi";

interface GenderProps {
  selectedGender: GenderEnum | 'unspecified' | undefined;
  setSelectedGender: (gender: GenderEnum | 'unspecified' | undefined) => void;
  componentName: string;
}

const Gender = ({ selectedGender, setSelectedGender, componentName }: GenderProps) => {
  const handleGenderSelection = (gender: GenderEnum | 'unspecified' | undefined) => {
    setSelectedGender(gender);
  };

  return (
    <div className={styles.genderArea}>
      <Button
        children="мужчина"
        onClick={() => handleGenderSelection(GenderEnum.Male)}
        className={cn(
          styles.genderArea__button,
          selectedGender === GenderEnum.Male ? styles.genderArea__button_selected : ""
        )}
        variant="gray"
        size="small"
        fontSize={componentName === "questions" ? "16" : "13"}
      />
      <Button
        children="женщина"
        onClick={() => handleGenderSelection(GenderEnum.Female)}
        className={cn(
          styles.genderArea__button,
          selectedGender === GenderEnum.Female ? styles.genderArea__button_selected : ""
        )}
        variant="gray"
        size="small"
        fontSize={componentName === "questions" ? "16" : "13"}
      />
      {componentName === "questions" && (
        <Button
          children="не указан"
          onClick={() => handleGenderSelection('unspecified')}
          className={cn(
            styles.genderArea__button,
            selectedGender === 'unspecified' ? styles.genderArea__button_selected : ""
          )}
          variant="gray"
          size="small"
        />
      )}
    </div>
  );
};

export default Gender;
