import { Card } from "../../components/Card/Card";
import { results } from "./Cards";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from "./MainPage.module.scss";

const MainPage = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.content__cardList}>
            {results.map((partner) => (
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
      <Footer />
    </>
  );
};

export default MainPage;
