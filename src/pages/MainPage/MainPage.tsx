import { Card } from "../../components/Card/Card";
import { results } from "./Cards";

import styles from "./MainPage.module.scss";

const MainPage = () => {
  return (
      <main className={styles.content}>
          <section className={styles.content__cardList}>
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
          </section>
      </main>
  );
};

export default MainPage;
