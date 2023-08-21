import React, {useEffect, useState } from 'react';
import {observer} from "mobx-react-lite";
import styles from './Header.module.scss';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../UI/Button/Button';
//import { useModel } from './model';
import logo from '../../images/svg/logo.svg';
import bell from '../../images/svg/header-bell.svg';
import bubble from '../../images/20px.png';
import k from '../../images/headerK.png';
import { useLocation } from "react-router";

import {useModel } from "../SignupSigninForm/model";

import { loggedIn } from "../../models/LoggedIn";


interface IProps {
  loggedIn: boolean;
}

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const model = useModel();

  useEffect(() => {
    console.log(`header_loggedIn: ${loggedIn.loggedIn}`);
  }, [loggedIn.loggedIn]);

  useEffect(() => {
    console.log(`header_user: ${model.user}`);
  }, [model.user]);

  useEffect(() => {
    console.log(`header_user: ${model.access}`);
  }, [model.user]);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to={`/`} className={styles.header__link}>
          <img src={logo} alt="Логотип проекта" />
        </Link>
        {(location.pathname !== "/signup") && (location.pathname !== "/signin") && !model.isLoggedIn &&
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
          {(location.pathname !== "/signup") && (location.pathname !== "/signin") && model.isLoggedIn &&
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
