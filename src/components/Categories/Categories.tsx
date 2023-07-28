import React, { memo } from "react";
import styles from "../Categories/Categories.module.scss";


type Category = {
    name: string;
    path: string;
  };
  
  type CategoriesProps = {
    value: Category;
    onChangeCategory: (value: Category) => void;
  };

  
  const Categories: React.FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
    const categories: Category[] = [
        {name: 'Все', path: ''},
        {name: "Сейчас онлайн", path: "?is_online=True"},
        {name: 'Новые пользователи', path: "?ordering=-date_joined" }
    ];

    return (
        <div className={styles.categories}>
            <ul>
                {categories.map((obj, i) => (
                <li key={i} onClick={() => onChangeCategory(obj)} className={value?.name === obj.name ? 'active' : ''}>
                    {obj.name}
                </li>
                ))}
            </ul>
        </div>
    )
});

export default Categories;