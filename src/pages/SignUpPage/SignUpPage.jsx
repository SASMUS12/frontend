import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import Header from '../../components/Header/Header';
import PicturesBlock from '../../components/PicturesBlock/PicturesBlock';

import { useModel } from './model';

import logo from '../../images/svg/logo.svg';

import styles from './SignUpPage.module.scss';

const SignUpPage = () => {
  const model = useModel();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className={styles.content}>
        <div className={styles.content__div1}>
          <div>
        <Input
          type="text"
          name="email"
          value={model.email}
          placeholder="Email или номер телефона"
          required
          onValue={model.handleChange}
        />
        <Input
          className={styles.input}
          type="password"
          name="password"
          value={model.password}
          placeholder="Пароль"
          required
          onValue={model.handleChange}
        />
        <Button
          className={styles.button}
          type="submit"
          variant="primary"
          size="m"
          disabled={model.isLoading}>
          {model.isLoading ? 'Loading' : 'Войти'}
        </Button>
        <a className={styles.link} href="#">
          Не можешь вспомнить свой пароль?
        </a>
          </div>
          <PicturesBlock />
        </div>
      </main>
    </>
  );
};

export default observer(SignUpPage);
