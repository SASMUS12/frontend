import React, { memo, useEffect } from "react";
import styles from "../Categories/Categories.module.scss";

type Category = {
  name: string;
  path: string;
};

type CategoriesProps = {
  value: Category;
  onChangeCategory: (value: Category) => void;
};

const Categories: React.FC<CategoriesProps> = memo(
  ({ value, onChangeCategory }) => {
    const categories: Category[] = [
      { name: "Все", path: "" },
      { name: "Сейчас онлайн", path: "True" },
      { name: "Новые пользователи", path: "-date_joined" },
    ];

    const setActiveStyle = (item: { name: string; path: string }) => {
      onChangeCategory(item);
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
              onClick={() => {
                setActiveStyle(obj);
              }}
              className={
                value.name === obj.name
                  ? styles.categories__active
                  : styles.categories__item
              }
            >
              {obj.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
