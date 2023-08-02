import React, {useEffect, useRef, useState} from 'react';

import {api} from '../../utils/constants';

import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import Categories from "../../components/Categories/Categories";
import Sort from "../../components/Sort/Sort";
import Footer from '../../components/Footer/Footer';
import {Button} from '../../components/UI/Button/Button';
import { Language } from '../../components/LanguageLevel/LanguageLevel';

import styles from './MainPage.module.scss';
import cn from "classnames";

import {useModel} from "../../components/SignUpAndSignInForm/model";
import {useNavigate, useParams} from "react-router-dom";

const MainPage = () => {
    const model = useModel();

    const {authPath} = useParams();
    const navigate = useNavigate();

    const getAuthPath = () => {
        if (authPath !== undefined ) {
            console.log(authPath.slice(0, 51));
            navigate("/");
        }
    }

// && authPath.slice(0, 51) === 'https://lingvogo.acceleratorpracticum.ru/'

    const [usersList, setUsersList] = useState<any[]>([]);
    const [isUsersList, setIsUsersList] = useState(false);
    const [category, setCategory] = useState({name: 'Все', path: ''});
    const [sortType, setSortType] = useState({});
    const [isSortPopupOpen, setIsSortPopupOpen] = useState(true);
    const [languagesData, setLanguagesData] = useState<Language[]>([]);

    const isModalOpen = model.isModalOpen;


    useEffect(() => {
        getAuthPath();
    }, []);

    const handleOpenSortPopup = () => {
        setIsSortPopupOpen(!isSortPopupOpen);
        console.log(isSortPopupOpen);
    }

    const getUsersList = async () => {
        try {
            console.log('отправка запроса ---');
            const response = await api.api.usersList(
                //{}, {path: `/api/v1/users/${category.path}`}
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
    

    useEffect(() => {
        getUsersList();
    }, [category, sortType]);

    const popupRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    useEffect(() => {
      popupRef.current.addEventListener("mousedown", (event: MouseEvent) => {
        const targetClasses = (event.target as Element).classList;
        if (targetClasses.contains("popup_opened")) {
            model.handleCloseModal();
            console.log(targetClasses);
            console.log(model.isModalOpen);
        }
      });
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
                    <button
                        className={cn(styles.content__sortButton, {
                            [styles.content__sortButton_open]: isSortPopupOpen,
                          })}
                        onClick={handleOpenSortPopup}
                    ></button>
                </div>
                <div className={styles.content__cardListAndSortPopup}>
                    <div
                        className={cn(styles.content__cardListAndSortPopup_cardList, isSortPopupOpen && styles.content__cardListAndSortPopup_cardList_narrow)}>
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
                    <Sort
                        value={sortType}
                        onChangeSort={setSortType}
                        isOpen={isSortPopupOpen}
                        languagesData={languagesData}
                    />
                </div>
                <Button className={styles.content__continuingButton} variant="transparent">
                    Продолжить искать
                </Button>
            </main>
            <Footer/>

            <div
                className={cn(styles.infoTooltip, styles.popup, isModalOpen ? styles.popup_opened : {})}
                ref={popupRef}
            >
                <div className={styles.infoTooltip__container}>
                    <button
                        type="button"
                        className={styles.infoTooltip__closeButton}
                        onClick={model.handleCloseModal}
                    ></button>
                    <h2 className={styles.content__modal_header}>Подтвердите адрес электронной почты</h2>
                    <p className={styles.content__modal_text_main}>Пожалуйста, проверьте электронную почту, которую
                        указали
                        при регистрации, и перейдите по ссылке для подтверждения</p>
                    <p className={styles.content__modal_text_additional}>Ссылка будет активна в течении 24 часов</p>
                </div>
            </div>

            {/*<InfoTooltip isOpen={model.isModalOpen}*/}
            {/*             onClose={model.handleCloseModal}>*/}
            {/*    <h2 className={styles.content__modal_header}>Подтвердите адрес электронной почты</h2>*/}
            {/*    <p className={styles.content__modal_text_main}>Пожалуйста, проверьте электронную почту, которую указали*/}
            {/*        при регистрации, и перейдите по ссылке для подтверждения</p>*/}
            {/*    <p className={styles.content__modal_text_additional}>Ссылка будет активна в течении 24 часов</p>*/}
            {/*</InfoTooltip>*/}
        </>
    );
};

export default MainPage;
