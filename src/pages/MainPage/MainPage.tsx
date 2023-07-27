import {useEffect, useState } from "react";

import {api} from "../../utils/constants"

import {Card} from "../../components/Card/Card";

import Header from "../../components/Header/Header";
import Categories from "../../components/Categories/Categories";
import Sort from "../../components/Sort/Sort"
import Footer from "../../components/Footer/Footer";

import styles from "./MainPage.module.scss";

const MainPage = () => {
    const [usersList, setUsersList] = useState<any[]>([]);
    const [isUsersList, setIsUsersList] = useState(false);
    const [categoryId, setCategortyId] = useState(0);
    const [sortType, setSortType] = useState({
        //Объект параметров сортировки(шаблон)
    });

    const getUsersList = async () => {
        try {
            console.log('отправка запроса ---');
            const response = await api.api.usersList({
                category: categoryId,
                sort: sortType
            });
            console.log('ответ получен -', response);
            setIsUsersList(true);

            if (response.data && response.data.results) {
                setUsersList(response.data.results);
            }
        } catch (error) {
            console.error('Ошибка при получении данных -', error);
            setIsUsersList(false);
        }
    };

    useEffect(() => {
        getUsersList();
    }, [categoryId, sortType]);

       return (
        <>
            <Header/>
            <main className={styles.main}>
                <section className={styles.content}>
                    <div className="content__top">
                        <Categories value={categoryId} onChangeCategory={setCategortyId} />
                        <Sort value={sortType} onChangeSort={setSortType} />
                    </div>
                    <div className={styles.content__cardList}>
                        {isUsersList &&
                            usersList.map((partner) => (
                                <Card
                                    country={partner.country}
                                    status={partner.status}
                                    first_name={partner.first_name}
                                    gender={partner.gender}
                                    age={partner.age}
                                    about={partner.about}
                                    indicator={partner.indicator}
                                    nativeLanguages={partner.native_languages}
                                    foreignLanguages={partner.foreign_languages}
                                />
                            ))}
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default MainPage;
