import React, { memo, useEffect, useState } from "react";
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
    {name: "Сейчас онлайн", path: "True"},
    {name: 'Новые пользователи', path: "-date_joined" }
  ];
  const [isActive, setIsActive] = useState('Все');

  const setActiveStyle = (item: any) => {
    setIsActive(item.name); 
    onChangeCategory(item)
  };

  useEffect(() => {
    console.log(value.name);
  }, [value]);

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((obj, i) => (
          <li 
            key={i} 
            onClick={() => {setActiveStyle(obj)}} 
            className={value.name === obj.name ? styles.categories__active : styles.categories__item}>
              {obj.name}
          </li>
        ))}
      </ul>
    </div>
  )
});

export default Categories;
