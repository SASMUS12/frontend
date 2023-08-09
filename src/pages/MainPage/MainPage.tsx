import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";

import {api} from '../../utils/constants';
import {Country} from '../../utils/openapi';
import {Language} from '../../utils/openapi';

import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import Categories from "../../components/Categories/Categories";
import Sort from "../../components/Sort/Sort";
import Footer from '../../components/Footer/Footer';

import MoreCards from "../../components/MoreCards/MoreCards";
import Modal from "../../components/Modal/Modal";

import styles from './MainPage.module.scss';
import cn from "classnames";

import {useModel} from "../../components/SignupSigninForm/model";

const MainPage = () => {
    const model = useModel();

    const handleCloseModal = () => {
        model.isModalOpen = false;
    };

    const [usersList, setUsersList] = useState<any[]>([]);
    const [cardsListLength, setCardsListLength] = useState<number>(0);
    const [isUsersList, setIsUsersList] = useState(false);
    const [category, setCategory] = useState({name: 'Все', path: ''});
    const [sortType, setSortType] = useState({});
    const [isSortPopupOpen, setSortPopupOpen] = useState(false);
    const [languagesData, setLanguagesData] = useState<Language[]>([]);
    const [countriesData, setCountriesData] = useState<Country[]>([]);

    const handleOpenSortPopup = () => {
        setSortPopupOpen(!isSortPopupOpen);
    }

    const getUsersList = async (filters:any) => {
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
    const fetchLanguagesData = async () => {
        try {
            console.log('отправка запроса ---');
            const response = await api.api.languagesList();
            console.log('ответ получен -', response);
            const languages = response.data;
            setLanguagesData(languages);
        } catch (error) {
            console.error("Ошибка при получении данных о языках:", error);
        }
    };

    useEffect(() => {
        fetchLanguagesData();
    }, []);

    //Запрос страны
    const fetchCountriesData = async () => {
        try {
            console.log('отправка запроса ---');
            const response = await api.api.countriesList();
            console.log('ответ получен -', response);
            const countries = response.data.map((country) => ({
                code: country.code,
                name: country.name,
                flag_icon: country.flag_icon,
            }));
            setCountriesData(countries);
        } catch (error) {
            console.error("Ошибка при получении данных о странах:", error);
        }
    };

    useEffect(() => {
        fetchCountriesData();
    }, []);

    return (
        <>
            <Header/>
            <main className={styles.content}>
                <h1 className={styles.content__header}>Поиск партнера</h1>
                <div className={styles.content__filterTag}>
                    <Categories value={category} onChangeCategory={setCategory}/>
                    <div className={styles.content__filter}>
                        <h3>Фильтр</h3>
                        <button
                            className={cn(styles.content__sortButton, {
                                [styles.content__sortButton_open]: isSortPopupOpen,
                            })}
                            onClick={handleOpenSortPopup}
                        ></button>
                    </div>
                </div>
                <div className={styles.content__cardListAndSortPopup}>
                    <div className={styles.content__cardListAndSortPopup_cardListArea}>
                        <div
                            className={cn(styles.content__cardListAndSortPopup_cardListArea_cardList,
                                isSortPopupOpen && styles.content__cardListAndSortPopup_cardListArea_cardList_narrow)}>
                            {isUsersList &&
                                usersList.map((user, i) => {
                                        return ((i < cardsListLength) &&
                                            <Card
                                                country={user.country}
                                                avatar={user.avatar}
                                                first_name={user.first_name}
                                                gender={user.gender}
                                                gender_is_hidden={user.gender_is_hidden}
                                                age={user.age}
                                                about={user.about}
                                                is_online={user.is_online}
                                                nativeLanguages={user.native_languages}
                                                foreignLanguages={user.foreign_languages}
                                                key={user.id}
                                            />
                                        );
                                    }
                                )}
                        </div>
                        <MoreCards cardsList={usersList} cardsListLength={cardsListLength} setCardsListLength={setCardsListLength} />
                    </div>
                    <Sort
                        value={sortType}
                        onChangeSort={setSortType}
                        isOpen={isSortPopupOpen}
                        languagesData={languagesData}
                        countriesData={countriesData}
                    />
                </div>

                <Modal isOpen={model.isModalOpen} onClose={handleCloseModal}>
                    <h2 className={styles.modal_header}>Подтвердите адрес электронной почты</h2>
                    <p className={styles.modal_text_main}>Пожалуйста, проверьте электронную почту, которую
                        указали
                        при регистрации, и перейдите по ссылке для подтверждения</p>
                    <p className={styles.modal_text_additional}>Ссылка будет активна в течении 24 часов</p>
                </Modal>
            </main>
            <Footer/>
        </>
    );
};

export default observer(MainPage);
