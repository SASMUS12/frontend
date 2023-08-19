import React, {useEffect, useState } from 'react';
import { useLocation } from "react-router";
import { useNavigate, Link } from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import styles from './Header.module.scss';
import { Button } from '../UI/Button/Button';
import { useModel } from '../SignupSigninForm/model';
import logo from '../../images/svg/logo.svg';
import bell from '../../images/svg/header-bell.svg';
import bubble from '../../images/20px.png';
import k from '../../images/headerK.png';
//import cn from "classnames";
import { loggedIn } from '../../models/loggedIn';

const Header = observer(() => {
  const model = useModel();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isAaa, setAaa] = useState(false);

  const checkIsSignUp = () => {
    setMenuOpen(!isMenuOpen)
  }

  const checkLogout = () => {
    localStorage.clear();
    setMenuOpen(!isMenuOpen);
    loggedIn.setLoggedInFalse();
    model.error = "";
    model.message = "";
    model.username = "";
    model.email = "";
    model.password = "";
    model.confirmPassword = "";
    model.isModalOpen = false;
    model.user = {};
    if (location.pathname !== "/") {
      navigate('/')
    }
  }

  useEffect(() => {
    model.getCurrentUser();
  }, [loggedIn.loggedIn]);

  useEffect(() => {
    setAaa(loggedIn.loggedIn);
  }, [loggedIn.loggedIn]);

  useEffect(() => {
    console.log('header next try');
    console.log(isAaa);
  }, [isAaa]);

  useEffect(() => {
    console.log('header')
    console.log(loggedIn.loggedIn)
  }, [loggedIn.loggedIn]);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to={`/`} className={styles.header__link}>
          <img src={logo} alt="Логотип проекта" />
        </Link>  
        {(location.pathname !== "/signup") && (location.pathname !== "/signin") && !loggedIn.loggedIn && 
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
          {(location.pathname !== "/signup") && (location.pathname !== "/signin") && loggedIn.loggedIn &&
          <div className={styles.header__iconsContainer}>
            <Link to={`/chats`} className={styles.header__link}>
              <img src={bubble} alt="Иконка чатов" className={styles.header__img}/>
            </Link>  
            <Link 
              to={`/messages`} 
              className={styles.header__link}>
              <img src={bell} alt="Иконка уведомлений"  className={styles.header__img}/>
            </Link>  
            <img 
              src={k} 
              alt="Переход в профиль пользователя" 
              className={styles.header__img} 
              onClick={checkIsSignUp}/>
            {isMenuOpen && 
              <div className={styles.header__menuContainer}>
                <Link to={`/profile`} className={styles.header__link}>
                  Посмотреть профиль
                </Link>
                <Link to={`/profile/edit`} className={styles.header__link}>
                  Редактировать профиль
                </Link> 
                <Link to={`/profile/settings`} className={styles.header__link}>
                  Настройки
                </Link>
                <p 
                  onClick={checkLogout}
                  className={styles.header__link}>
                    Выйти
                </p>
              </div>
            }
          </div>}
        </div>
    </header>
  );
});

export default Header;
