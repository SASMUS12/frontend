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
                Новичок
              </label>
              <label>
                <input type="checkbox" name="Любитель" />
                Любитель
              </label>
              <label>
                <input type="checkbox" name="Профи" />
                  Профи
              </label>
              <label>
                <input type="checkbox" name="Эксперт" />
                 Эксперт
              </label>
              <label>
               <input type="checkbox" name="Гуру" />
                 Гуру
              </label>
              <label>
                <input type="checkbox" name="Носитель" />
                 Носитель
              </label>
            </div>
        </>
    )
}

export default LanguageLevel;