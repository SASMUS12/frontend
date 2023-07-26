import {useEffect, useState } from "react";

import {Api} from "../../utils/openapi";
import {baseUrl} from "../../utils/constants"

import {Card} from "../../components/Card/Card";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from "./MainPage.module.scss";

const MainPage = () => {
    const api = new Api({baseUrl: baseUrl});

    const [usersList, setUsersList] = useState<any[]>([]);
    const [isUsersList, setIsUsersList] = useState(false);
    const getUsersList = async () => {
        try {
            console.log('отправка запроса ---');
            const response = await api.api.usersList();
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
    }, []);

    return (
        <>
            <Header/>
            <main className={styles.main}>
                <section className={styles.content}>
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
