import React from "react";
import styles from "../../components/LanguageLevel/LanguageLevel.module.scss"

const LanguageLevel = () => {

    return(
        <>
            <div className={styles.language__option}>
              <select >
                <option>Напишите или выберете</option>
              </select>
            </div>
            <div className={styles.language__level}>
              <label>
                <input type="checkbox" name="Новичок" />
                <span className={styles.languageLevel_checkbox_visible}></span>
                Новичок
              </label>
              <label>
                <input type="checkbox" name="Любитель" />
                <span className={styles.languageLevel_checkbox_visible}></span>
                Любитель
              </label>
              <label>
                <input type="checkbox" name="Профи" />
                <span className={styles.languageLevel_checkbox_visible}></span>
                  Профи
              </label>
              <label>
                <input type="checkbox" name="Эксперт" />
                <span className={styles.languageLevel_checkbox_visible}></span>
                 Эксперт
              </label>
              <label>
               <input type="checkbox" name="Гуру" />
               <span className={styles.languageLevel_checkbox_visible}></span>
                 Гуру
              </label>
              <label>
                <input type="checkbox" name="Носитель" />
                <span className={styles.languageLevel_checkbox_visible}></span>
                 Носитель
              </label>
            </div>
        </>
    )
}

export default LanguageLevel;