import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { api } from '../../utils/constants';
import { Country } from '../../utils/openapi';
import { Language } from '../../utils/openapi';

import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import Footer from '../../components/Footer/Footer';

import MoreCards from '../../components/MoreCards/MoreCards';

import styles from './MainPage.module.scss';
import cn from 'classnames';

import { loggedIn } from '../../models/LoggedIn';

const MainPage = () => {
  useEffect(() => {
    console.log(`main_loggedIn: ${loggedIn.loggedIn}`);
  }, []);

  const [usersList, setUsersList] = useState<any[]>([]);
  const [cardsListLength, setCardsListLength] = useState<number>(0);
  const [isUsersList, setIsUsersList] = useState(false);
  const [category, setCategory] = useState({ name: 'Все', path: '' });
  const [sortType, setSortType] = useState({});
  const [filters, setFilters] = useState<any>({});
  const [isSortPopupOpen, setSortPopupOpen] = useState(false);

  const handleOpenSortPopup = () => {
    setSortPopupOpen(!isSortPopupOpen);
  };

  const getUsersList = async (filters: any) => {
    try {
      console.log('отправка запроса ---');
      const response = await api.api.usersList({
        ordering: `${category.path}`,
        ...filters,
      });
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
    getUsersList(sortType);
  }, [category, sortType]);

  //Запрос массива языков

  return (
    <>
      <Header />
      <main className={styles.content}>
        <h1 className={styles.content__header}>Поиск партнера</h1>
        <div className={styles.content__filterTag}>
          <Categories value={category} onChangeCategory={setCategory} />
          <div className={styles.content__filterTag_filter}>
            <h3 className={styles.content__filterTag_filter_title}>Фильтр</h3>
            <button
              className={styles.content__filterTag_filter_button}
              onClick={handleOpenSortPopup}
            ></button>
          </div>
        </div>
        <div className={styles.content__cardListAndSortPopup}>
          <div className={styles.content__cardListAndSortPopup_cardListArea}>
            <div
              className={cn(
                styles.content__cardListAndSortPopup_cardListArea_cardList,
                isSortPopupOpen &&
                  styles.content__cardListAndSortPopup_cardListArea_cardList_narrow,
              )}
            >
              {isUsersList &&
                usersList.map((user, i) => {
                  return (
                    i < cardsListLength && (
                      <Card
                        country={user.country}
                        avatar={user.avatar}
                        first_name={user.first_name}
                        gender={user.gender}
                        gender_is_hidden={user.gender_is_hidden}
                        age={user.age}
                        age_is_hidden={user.age_is_hidden}
                        about={user.about}
                        is_online={user.is_online}
                        languages={user.languages}
                        key={user.id}
                      />
                    )
                  );
                })}
            </div>
            <MoreCards
              cardsList={usersList}
              cardsListLength={cardsListLength}
              setCardsListLength={setCardsListLength}
            />
          </div>
          <Sort onChangeSort={setFilters} isOpen={isSortPopupOpen} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default observer(MainPage);
