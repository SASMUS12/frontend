import { useState } from "react";

const Sort( value, onChangeSort ) => {
    const [open, setOpen] = useState(0);

    return (
        <>
            <div className="sort">
                <h2>Страна партнера</h2>
                <input type="text" id="searchInput" placeholder="Начните вводить название" />
            </div>
            <div className="language">
                <h2>Язык партнера</h2>
                <select>
                    <option>Все языки</option>
                </select>
            </div>
            <div className="language-level">
                <h2>Уровень владения языком</h2>
                <label><input type="checkbox" /> Новичок</label>
                <label><input type="checkbox" /> Любитель</label>
                <label><input type="checkbox" /> Профи</label>
                <label><input type="checkbox" /> Эксперт</label>
                <label><input type="checkbox" /> Гуру</label>
                <label><input type="checkbox" /> Носитель</label>
            </div>
            <div className="partner-info">
            <h2>Пол</h2>
                <button> Мужчина</button>
                <button> Женщина</button>
            <h2>Возраст</h2>
                <input type="range" min="18" max="100" />
            </div>        
        </>
    )
}
export default Sort;