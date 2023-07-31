import React, { useState } from "react";
import styles from "../Sort/Sort.module.scss";
import LanguageLevelp from "../LanguageLevel/LanguageLevel";
import { Button } from "../UI/Button/Button";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";

interface SliderComponentProps {
  styles: {
    slider_container: string;
    slider: string;
    slider_value: string;
    popup__sort: string;
  };
}


const Sort: React.FC<SliderComponentProps> = () => {

  const [leftValue, setLeftValue] = useState<number>(18);
  const [rightValue, setRightValue] = useState<number>(40);

  const handleSliderChange = (left: number, right: number) => {
    setLeftValue(left);
    setRightValue(right);
    // Дополнительная логика при изменении значений слайдера, если необходимо
  };

    // const [open, setOpen] = useState(false);

    // const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     // Ваша логика для обработки изменения в поле поиска
    //     // Можете использовать event.target.value, чтобы получить введенное значение
    //     // Например, вы можете обновить состояние сортировки по стране на основе этого значения
    //     // и передать его в функцию onChangeSort
    //   };
    
    //   const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     // Ваша логика для обработки изменения выбранного языка
    //     // Можете использовать event.target.value, чтобы получить выбранный язык
    //     // Например, вы можете обновить состояние сортировки по языку на основе этого значения
    //     // и передать его в функцию onChangeSort
    //   };

  return (
      <div className={ styles.popup__sort}>
        <div className={styles.popup__cantry}>
          <h2 >Страна партнера</h2>
          <div className={styles.popup__enter}>
            <input
              type="text"
              id="searchInput"
              placeholder="Начните вводить название"
              // onChange={handleSearchInputChange}
            />
          </div>
          </div>
          <h2>Язык партнера</h2>
          <LanguageLevelp/>
          <div>
            <Button 
              className={styles.popup__add}
              children={"добавить язык"}
            />
          </div>
          <div className={styles.popup__partner}>
            <h2>О партнере</h2>
            <div className={styles.popup__gender}>
              <h3>Пол</h3>
              <Button                   
                children={"Мужчина"} 
              />
              <Button
                children={"Женщина"} 
              />
             </div>
            </div>
            <div className={styles.popup__age}>
              <h3>Возраст</h3>
              <MultiRangeSlider 
                minValue={0}
                maxValue={100}
                leftValue={leftValue}
                rightValue={rightValue}
                onChange={handleSliderChange}
              />
            </div>
            <Button
              className={styles.popup__findButton}
              children={"Найти"}
            />
      </div>

  );
};
    
export default Sort;