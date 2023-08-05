import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import QuestionBlock from '../../components/QuestionBlock/QuestionBlock';
import { FAQArray } from '../../utils/constants';
import IQuestion from '../../types/types'

interface IProps {
  item: IQuestion
}

import styles from './FAQPage.module.scss';

const FAQPage = () => {

  return (
    <>
      <Header />
      <main className={styles.content}>
        <h1 className={styles.content__title}>FAQ, или куда вы попали</h1>
        <div className={styles.content__textBlock}>
          {FAQArray.map(current => <QuestionBlock item={current} key={current.id}/>)}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FAQPage;
