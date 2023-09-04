import { Button } from "../UI/Button/Button";

import { GenderEnum, NullEnum } from "../../utils/openapi";

import styles from "./Gender.module.scss";
import cn from "classnames";

interface GenderProps {
  selectedGender: string | GenderEnum | NullEnum | null;
  setSelectedGender: (gender: GenderEnum | NullEnum | null) => void;
  componentName: string;
}

const Gender = ({
  selectedGender,
  setSelectedGender,
  componentName,
}: GenderProps) => {
  const handleGenderSelection = (gender: GenderEnum | NullEnum | null) => {
    setSelectedGender(gender);
  };

  return (
    <div className={styles.genderArea}>
      <Button
        type="button"
        children="мужчина"
        onClick={() => handleGenderSelection(GenderEnum.Male)}
        className={cn(
          styles.genderArea__button,
          selectedGender === GenderEnum.Male
            ? styles.genderArea__button_selected
            : ""
        )}
        variant="gray"
        size="small"
        fontSize={componentName === "fillOutProfile" ? "16" : "13"}
      />
      <Button
        type="button"
        children="женщина"
        onClick={() => handleGenderSelection(GenderEnum.Female)}
        className={cn(
          styles.genderArea__button,
          selectedGender === GenderEnum.Female
            ? styles.genderArea__button_selected
            : ""
        )}
        variant="gray"
        size="small"
        fontSize={componentName === "fillOutProfile" ? "16" : "13"}
      />
      {componentName === "fillOutProfile" && (
        <Button
          type="button"
          children="не указан"
          onClick={() => handleGenderSelection(null)}
          className={cn(
            styles.genderArea__button,
            selectedGender === null ? styles.genderArea__button_selected : ""
          )}
          variant="gray"
          size="small"
        />
      )}
    </div>
  );
};

export default Gender;
