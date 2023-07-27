import {useEffect, useState} from "react";

import {api} from "../../utils/constants"

import {Card} from "../../components/Card/Card";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Button} from "../../components/UI/Button/Button";

import styles from "./MainPage.module.scss";


const MainPage = () => {
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
            <main className={styles.content}>
                <h1 className={styles.content__header}>Поиск партнера</h1>
                <div className={styles.content__filterTag}>
                    <div className={styles.content__categories}>


                    </div>

                </div>
                    <div className={styles.content__cardList}>
                        {isUsersList &&
                            usersList.map((partner) => (
                                <Card
                                    country={partner.country.code}
                                    flag={partner.country.flag_icon}
                                    status={partner.status}
                                    avatar={partner.avatar}
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
                    <Button
                        className={styles.content__continuingButton}
                        variant="transparent"
                    >
                        Продолжить искать
                    </Button>
            </main>
            <Footer/>
        </>
    );
};

export default MainPage;
