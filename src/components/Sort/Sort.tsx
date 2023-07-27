import React, { useState } from "react";

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
        <>
          <div className="sort">
            <h2>Страна партнера</h2>
            <input
              type="text"
              id="searchInput"
              placeholder="Начните вводить название"
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="language">
            <h2>Язык партнера</h2>
            <select onChange={handleLanguageChange}>
              <option>Все языки</option>
              {/* Здесь вы можете отобразить все доступные языки, например, из какого-то списка */}
              {/* Можете использовать value и label для каждого option */}
            </select>
          </div>
          <div className="language-level">
            <h2>Уровень владения языком</h2>
            {/* Здесь вы можете добавить чекбоксы для различных уровней владения языком */}
          </div>
          <div className="partner-info">
            <h2>Пол</h2>
            {/* Здесь вы можете добавить кнопки для выбора пола партнера */}
            {/* Например, кнопки "Мужчина" и "Женщина" */}
          </div>
          <h2>Возраст</h2>
          <input type="range" min="18" max="100" />
        </>
      );
    };
    
    export default Sort;