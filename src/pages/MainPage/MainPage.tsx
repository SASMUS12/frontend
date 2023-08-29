import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { api } from '../../utils/constants';

import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import Footer from '../../components/Footer/Footer';

import MoreCards from '../../components/MoreCards/MoreCards';

import styles from './MainPage.module.scss';
import cn from 'classnames';

import { loggedIn } from '../../models/LoggedIn';
import Modal from '../../components/Modal/Modal';
import { useModel } from '../../components/SignupSigninForm/model';

const MainPage = () => {

  const model = useModel();

  const handleCloseModal = () => {
    model.isModalOpen = false;
  };

  useEffect(() => {
    console.log(`main_loggedIn: ${loggedIn.loggedIn}`);
  }, []);

  const [usersList, setUsersList] = useState<any[]>([]);
  const [cardsListLength, setCardsListLength] = useState<number>(0);
  const [isUsersList, setIsUsersList] = useState(false);
  const [category, setCategory] = useState({ name: 'Все', path: '' });
  const [filters, setFilters] = useState<any>({});
  const [isSortPopupOpen, setSortPopupOpen] = useState(false);

  const handleOpenSortPopup = () => {
    setSortPopupOpen(!isSortPopupOpen);
  };

  const getUsersList = async (filters: any) => {
    try {
      console.log('отправка запроса ---');
      const languageFilters = filters.languages.map((languageFilter: any) => {
        return `${languageFilter.language},${languageFilter.skill_level}`;
      });
      const response = await api.api.usersList({
        ordering: `${category.path}`,
        age: filters.age,
        country: filters.country,
        gender: filters.gender,
        languages: languageFilters.join(';'),
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
    getUsersList(filters);
  }, [category, filters]);

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
        <Modal isOpen={model.isModalOpen} onClose={handleCloseModal}>
          <h2 className={styles.modal_header}>
            Подтвердите адрес электронной почты
          </h2>
          <p className={styles.modal_text_main}>
            Пожалуйста, проверьте электронную почту, которую указали при
            регистрации, и перейдите по ссылке для подтверждения
          </p>
          <p className={styles.modal_text_additional}>
            Ссылка будет активна в течении 24 часов
          </p>
        </Modal>
      </main>
      <Footer />
    </>
  );
};

export default observer(MainPage);
