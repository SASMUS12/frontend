import React, { useState } from "react";
import styles from "../Sort/Sort.module.scss";

type SortProps = {
    value: any;
    onChangeSort: (sortType: any) => void;
  };

const Sort: React.FC<SortProps> = ({ value, onChangeSort }) => {
    
    const [open, setOpen] = useState(false);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Ваша логика для обработки изменения в поле поиска
        // Можете использовать event.target.value, чтобы получить введенное значение
        // Например, вы можете обновить состояние сортировки по стране на основе этого значения
        // и передать его в функцию onChangeSort
      };
    
      const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Ваша логика для обработки изменения выбранного языка
        // Можете использовать event.target.value, чтобы получить выбранный язык
        // Например, вы можете обновить состояние сортировки по языку на основе этого значения
        // и передать его в функцию onChangeSort
      };

      return (
        <div className={styles.popup__sort}>
            <div>
              <h2 className={styles.popup__cantry}>Страна партнера</h2>
              <input
                type="text"
                id="searchInput"
                placeholder="Начните вводить название"
                onChange={handleSearchInputChange}
              />
            </div>
            <div className={styles.popup__language}>
              <h2 >Язык партнера</h2>
              <select onChange={handleLanguageChange}>
                <option>Напишите или выберете</option>
              </select>
            </div>
            <div className={styles.popup__level}>
              <label>
                <input type="checkbox" name="Новичок" />
                Новичок
              </label>
              <label className={styles.popup__level}>
                <input type="checkbox" name="Любитель" />
                Любитель
              </label>
              <label className={styles.popup__level}>
                <input type="checkbox" name="Профи" />
                  Профи
              </label>
              <label className={styles.popup__level}>
                <input type="checkbox" name="Эксперт" />
                 Эксперт
              </label>
              <label className={styles.popup__level}>
               <input type="checkbox" name="Гуру" />
                 Гуру
              </label>
              <label className={styles.popup__level}>
                <input type="checkbox" name="Носитель" />
                 Носитель
              </label>
            </div>
            <button><img src="../../images/svg/plus in circle.svg" alt="ДобавитьЯзык" />добавить язык</button>
            <div>
              <h2 className={styles.popup__partner__info}>О партнере</h2>
              <h3>Пол</h3>
              <button>Мужчина</button>
              <button>Женщина</button>
            </div>
            <div>
              <h3>Возраст</h3>
              <input type="range" min="18" max="100" />
            </div>
            <div className={styles.popap__search}>
              <button>Найти</button>
            </div>
        </div>
      );
    };
    
    export default Sort;