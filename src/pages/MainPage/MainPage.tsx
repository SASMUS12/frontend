import {useEffect, useState} from "react";

import { Api } from "../../utils/openapi";
import { baseUrl } from "../../utils/constants"

import { Card } from "../../components/Card/Card";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from "./MainPage.module.scss";

const MainPage = () => {

    const [usersList, setUsersList] = useState([]);
        const getUsersList = async () => {
            try {
                const api = new Api({baseUrl: baseUrl});
                console.log('отправка запроса ---');
                const response = await api.api.usersList({
                    limit: 10,
                });
                console.log('ответ получен -', response);

                if (response.data && response.data.results) {
                    setUsersList(response.data.results);
                }
            } catch (error) {
                console.error('Ошибка при получении данных -', error);
            }
        };

    useEffect(() => {
        getUsersList();
    }, []);

  return (
    <>
      <Header />
      {/*<main className={styles.main}>*/}
      {/*  <section className={styles.content}>*/}
      {/*    <div className={styles.content__cardList}>*/}
      {/*      {usersList.map((user) => (*/}
      {/*        <Card*/}
      {/*          country={user.country}*/}
      {/*          status={user.status}*/}
      {/*          first_name={user.first_name}*/}
      {/*          gender={user.gender}*/}
      {/*          age={user.age}*/}
      {/*          about={user.about}*/}
      {/*          indicator={user.indicator}*/}
      {/*          nativeLanguages={user.native_languages}*/}
      {/*          foreignLanguages={user.foreign_languages}*/}
      {/*        />*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </section>*/}
      {/*</main>*/}
      <Footer />
    </>
  );
};

export default MainPage;
