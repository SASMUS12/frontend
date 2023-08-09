import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";

import {api} from '../../utils/constants';
import {Country} from '../../utils/openapi';
import {Language} from '../../utils/openapi';

import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import Categories from "../../components/Categories/Categories";
import Sort from "../../components/Sort/Sort";
import Footer from '../../components/Footer/Footer';

import {Button} from '../../components/UI/Button/Button';
import Modal from "../../components/Modal/Modal";

import styles from './MainPage.module.scss';
import cn from "classnames";

import {useModel} from "../../components/SignupSigninForm/model";

const MainPage = () => {
    const model = useModel();

    const [usersList, setUsersList] = useState<any[]>([]);
    const [isUsersList, setIsUsersList] = useState(false);
    const [category, setCategory] = useState({name: 'Все', path: ''});
    const [sortType, setSortType] = useState({});
    const [isSortPopupOpen, setSortPopupOpen] = useState(false);
    const [languagesData, setLanguagesData] = useState<Language[]>([]);
    const [countriesData, setCountriesData] = useState<Country[]>([]);

    const isModalOpen = model.isModalOpen;

    const handleOpenSortPopup = () => {
        setSortPopupOpen(!isSortPopupOpen);
    }

    const getUsersList = async () => {
        try {
            console.log('отправка запроса ---');
            const response = await api.api.usersList(
                {ordering: `${category.path}`}
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

    useEffect(() => {
        console.log(model.isLoggedIn);
    }, [model.isLoggedIn]);


    const popupRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        if (popupRef.current) {
            popupRef.current.addEventListener("mousedown", (event: MouseEvent) => {
                const targetClasses = (event.target as Element).classList;
                if (targetClasses.contains("popup_opened")) {
                    model.handleCloseModal();
                    console.log(targetClasses);
                    console.log(model.isModalOpen);
                }
            });
        }
    }, [model.isModalOpen]);

    // Закрытие popup при нажатии на Esc
    const handleCloseByEsc = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            model.handleCloseModal();
            console.log(popupRef);
            const targetClasses = (event.target as Element).classList;
            console.log(targetClasses);
            console.log(model.isModalOpen);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            // Список действий внутри одного хука
            document.addEventListener("keydown", handleCloseByEsc);
            // Возвращаем функцию, которая удаляет эффекты
            return () => {
                document.removeEventListener("keydown", handleCloseByEsc);
            };
        }
    }, [model.isModalOpen]);

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
                                usersList.map((user, i) => (
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
                        <Button className={styles.content__cardListAndSortPopup_cardListArea_continuingButton} variant="transparent">
                            Продолжить искать
                        </Button>
                    </div>
                    <Sort
                        value={sortType}
                        onChangeSort={setSortType}
                        isOpen={isSortPopupOpen}
                        languagesData={languagesData}
                        countriesData={countriesData}
                    />
                </div>

                <Modal isOpen={model.isModalOpen} onClose={model.handleCloseModal}>
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
