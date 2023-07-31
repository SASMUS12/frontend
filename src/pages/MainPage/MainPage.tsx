import React, {ChangeEvent, useEffect, useState} from 'react';

import {api} from '../../utils/constants';
import {useModel} from '../../components/SignUpAndSignInForm/model'

import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import Categories from "../../components/Categories/Categories";
import Sort from "../../components/Sort/Sort";
import Footer from '../../components/Footer/Footer';
import {Button} from '../../components/UI/Button/Button';
import Modal from "../../components/Modal/Modal";

import styles from './MainPage.module.scss';
import cn from "classnames";

const MainPage = () => {
    const model = useModel();

    const [usersList, setUsersList] = useState<any[]>([]);
    const [isUsersList, setIsUsersList] = useState(false);
    const [category, setCategory] = useState({name: 'Все', path: ''});
    const [sortType, setSortType] = useState({
        //Объект параметров сортировки(шаблон)
    });
    const [isSortPopupOpen, setSortPopupOpen] = useState(true);

    const handleOpenSortPopup = () => {
        setSortPopupOpen(!isSortPopupOpen);
        console.log(isSortPopupOpen);
    }

    const getUsersList = async () => {
        try {
            console.log('отправка запроса ---');
            const response = await api.api.usersList(
                // {}, {path: `/api/v1/users/${category.path}`}
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
            <Header/>
            <main className={styles.content}>
                <h1 className={styles.content__header}>Поиск партнера</h1>
                <div className={styles.content__filterTag}>
                    <Categories value={category} onChangeCategory={setCategory}/>
                    <button className={styles.content__sortButton} onClick={handleOpenSortPopup}></button>
                </div>
                <div className={styles.content__cardListAndSortPopup}>
                    <div className={cn(styles.content__cardListAndSortPopup_cardList, isSortPopupOpen && styles.content__cardListAndSortPopup_cardList_narrow)}>
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
                    />
                </div>
                <Button className={styles.content__continuingButton} variant="transparent">
                    Продолжить искать
                </Button>
            </main>
            <Footer/>
            {/*<Modal isOpen={model.isModalOpen} onClose={model.handleCloseModal}>*/}
            {/*    <h2 className={styles.content__modal_header}>Подтвердите адрес электронной почты</h2>*/}
            {/*    <p className={styles.content__modal_text_main}>Пожалуйста, проверьте электронную почту, которую указали при регистрации, и перейдите по ссылке для подтверждения</p>*/}
            {/*    <p className={styles.content__modal_text_additional}>Ссылка будет активна в течении 24 часов</p>*/}
            {/*</Modal>*/}
        </>
    );
};

export default MainPage;
