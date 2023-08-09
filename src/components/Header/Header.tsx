import React, {useEffect, useState } from 'react';
import {observer} from "mobx-react-lite";
import styles from './Header.module.scss';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../UI/Button/Button';
import { useModel } from './model';
import logo from '../../images/svg/logo.svg';
import bell from '../../images/svg/header-bell.svg';
import bubble from '../../images/20px.png';
import k from '../../images/headerK.png';
import { useLocation } from "react-router";

import {useModel as useModel1} from "../SignupSigninForm/model";


interface IProps {
  loggedIn: boolean;
}

const Header = () => {
  const model = useModel();
  const navigate = useNavigate();
  const location = useLocation();
  const model1 = useModel1();

  useEffect(() => {
    console.log(`header: ${model1.isLoggedIn}`);
  }, [model1.isLoggedIn]);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to={`/`} className={styles.header__link}>
          <img src={logo} alt="Логотип проекта" />
        </Link>  
        {(location.pathname !== "/signup") && (location.pathname !== "/signin") && !model1.isLoggedIn && 
          <div className={styles.header__buttonContainer}>
            <Button
              className={styles.button}
              type="submit"
              variant="primary"
              disabled={model.isLoading}
              onClick={() => navigate('/signin')}>
              {model.isLoading ? 'Loading' : 'Войти'}
            </Button>
            <Button
              className={styles.button}
              type="submit"
              variant="transparent"
              disabled={model.isLoading}
              onClick={() => navigate('/signup')}>
              {model.isLoading ? 'Loading' : 'Зарегистрироваться'}
            </Button>
          </div>}
          {(location.pathname !== "/signup") && (location.pathname !== "/signin") && model1.isLoggedIn &&
          <div className={styles.header__iconsContainer}>
            <Link to={`/chats`} className={styles.header__link}>
              <img src={bubble} alt="Иконка чатов" className={styles.header__img}/>
            </Link>  
            <Link to={`/messages`} className={styles.header__link}>
              <img src={bell} alt="Иконка уведомлений"  className={styles.header__img}/>
            </Link>  
            <Link to={`/profile`} className={styles.header__link}>
              <img src={k} alt="Переход в профиль пользователя"  className={styles.header__img}/>
            </Link> 
          </div>}
        </div>
    </header>
  );
};

export default observer(Header);
