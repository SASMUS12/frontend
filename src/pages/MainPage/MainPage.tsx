import { useEffect, useState } from 'react';

import { api } from '../../utils/constants';

import Card from '../../components/Card/Card';

import Header from '../../components/Header/Header';
import Categories from "../../components/Categories/Categories";
import Sort from "../../components/Sort/Sort";
import Footer from '../../components/Footer/Footer';
import { Button } from '../../components/UI/Button/Button';

import styles from './MainPage.module.scss';

const MainPage = () => {
  const [usersList, setUsersList] = useState<any[]>([]);
  const [isUsersList, setIsUsersList] = useState(false);
  const [category, setCategorty] = useState({name: 'Все', path: ''});
  const [sortType, setSortType] = useState({
        //Объект параметров сортировки(шаблон)
    });

  const getUsersList = async () => {
    try {
      console.log('отправка запроса ---');
      const response = await api.api.usersList(
                // slug: category?.path,
                // sort: sortType,
            );
      console.log('ответ получен -', response);
      setIsUsersList(true);

      if (response.data && response.data.results) {
        setUsersList(response.data.results);
        console.log(response.data.results);
      }
    } catch (error) {
      console.error('Ошибка при получении данных -', error);
      setIsUsersList(false);
    }
  };

  useEffect(() => {
    getUsersList();
  }, [category, sortType]);

  return (
    <>
      <Header />
      <main className={styles.content}>
        <h1 className={styles.content__header}>Поиск партнера</h1>
        <div className={styles.content__filterTag}>
            <Categories value={category} onChangeCategory={setCategorty} />
            <button className={styles.content__button}></button>
        </div>
        <div className={styles.content__cardList}>
        <Sort value={sortType} onChangeSort={setSortType} />
          {isUsersList &&
            usersList.map((user) => (
              <Card
                country={user.country}
                status={user.status}
                avatar={user.avatar}
                first_name={user.first_name}
                gender={user.gender}
                gender_is_hidden={user.gender_is_hidden}
                age={user.age}
                about={user.about}
                indicator={user.indicator}
                nativeLanguages={user.native_languages}
                foreignLanguages={user.foreign_languages}
                key={user.id}
              />
            ))}
        </div>
        <Button className={styles.content__continuingButton} variant="transparent">
          Продолжить искать
        </Button>
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
