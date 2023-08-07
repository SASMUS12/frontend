import React, {useEffect, useState } from 'react';
import {observer} from "mobx-react-lite";

import {api} from '../../utils/constants';

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

    return (
        <>
            <Header />
            <main className={styles.content}>
                <h1 className={styles.content__header}>Поиск партнера</h1>
                <div className={styles.content__filterTag}>
                    <Categories value={category} onChangeCategory={setCategory}/>
                    <button className={styles.content__sortButton} onClick={handleOpenSortPopup}></button>
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
                    />
                </div>
                <Button className={styles.content__continuingButton} variant="transparent">
                    Продолжить искать
                </Button>

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
