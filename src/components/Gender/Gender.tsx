import {Button} from "../UI/Button/Button";

import styles from "./Gender.module.scss";
import cn from "classnames";

const Gender = ({selectedGender, setSelectedGender, componentName}) => {
    const handleGenderSelection = (gender: string) => {
        setSelectedGender(gender);
    };

    return (
        <div className={styles.genderArea}>
            <Button
                children="мужчина"
                onClick={() => handleGenderSelection('Male')}
                className={cn(
                    styles.genderArea__button,
                    selectedGender === 'Male' ? styles.genderArea__button_selected : '')}
                variant="gray"
                size="small"
                fontSize={componentName === "questions" ? "16" : "13"}
            />
            <Button
                children="женщина"
                onClick={() => handleGenderSelection('Female')}
                className={cn(
                    styles.genderArea__button,
                    selectedGender === 'Female' ? styles.genderArea__button_selected : '')}
                variant="gray"
                size="small"
                fontSize={componentName === "questions" ? "16" : "13"}
            />
            {componentName === "questions" &&
                <Button
                    children="не указан"
                    onClick={() => handleGenderSelection('')}
                    className={cn(
                        styles.genderArea__button,
                        selectedGender === '' ? styles.genderArea__button_selected : '')}
                    variant="gray"
                    size="small"
                />
            }
        </div>
    );
}

export default Gender;
