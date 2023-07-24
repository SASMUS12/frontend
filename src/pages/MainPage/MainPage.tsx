import { Card } from "../../components/Card/Card";

import styles from "./MainPage.module.scss";

const MainPage = () => {
  return (
      <main className={styles.content}>
          <section className={styles.content__cardList}>
             <Card
                 country="Россия"
                 status="в сети"
                 first_name="Dyah"
                 gender="Женский"
                 age={31}
                 about="Hello! I’m Dyah from Indonesia. I like to make new friends. Feel free to chat me!"
                 indicator={true}
             />
          </section>
      </main>
  );
};

export default MainPage;
