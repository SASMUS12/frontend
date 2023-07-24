import { observer } from 'mobx-react-lite';
import { Button } from '../../components/ui/Button';
import { useModel } from './model';
import logo from '../../images/svg//logo.svg';

import styles from './MainPage.module.scss';

const MainPage = () => {
  const model = useModel();

  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="Логотип проекта" />
        <Button type="submit" variant="primary" size="s" disabled={model.isLoading}>
          {model.isLoading ? 'Loading' : 'Регистрация'}
        </Button>
      </header>
      <main className={styles.content}></main>
    </>
  );
};

export default observer(MainPage);
