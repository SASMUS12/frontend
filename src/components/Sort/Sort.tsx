import React, { useState } from "react";
import styles from "../Sort/Sort.module.scss";
import LanguageLevelp from "../LanguageLevel/LanguageLevel";
import { Button } from "../UI/Button/Button";

interface SliderComponentProps {
  styles: {
    slider_container: string;
    slider: string;
    slider_value: string;
    popup__sort: string;
  };
}


const Sort: React.FC<SliderComponentProps> = () => {

  const [sliderValue, setSliderValue] = useState<number[]>([18, 100]);


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

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
  
      if (event.target.name === "from") {
        setSliderValue([value, sliderValue[1]]);
      } else if (event.target.name === "to") {
        setSliderValue([sliderValue[0], value]);
      }
    };

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


              <div className={styles.slider_wrapper}>
                <div className={styles.container}>
                  <div className={styles.slider_track}></div>
                  <input type="range" min={18} max={100} value={18} name="" id="slider-1" />
                  <input type="range" min={18} max={100} value={40} name="" id="slider-2" />     
                </div>
                <div className={styles.slider_values}>
                  <span id="range1">
                    {}
                  </span>
                  <span id="range2">
                    {}
                  </span>
                </div>                
              </div>
            <div>
              <Button children={"Найти"} />
            </div>
        </div>
      </div>
  );
};
    
export default Sort;