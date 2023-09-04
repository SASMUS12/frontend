import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Input } from '../UI/Input/Input';
import { Button } from '../UI/Button/Button';
import { loggedIn } from '../../models/LoggedIn';

import { useModel } from './model';

import styles from './SignupSigninForm.module.scss';
import cn from 'classnames';

const SignupSigninForm = () => {
  const model = useModel();

  const location = useLocation();
  const pathName: string = location.pathname;

  const [isSignUp, setIsSignUp] = useState(false);

  const checkIsSignUp = () => {
    pathName === '/signup' ? setIsSignUp(true) : setIsSignUp(false);
  };

  useEffect(() => {
    model.checkIsSignUp();
  }, [pathName]);

  useEffect(() => {
    model.getCurrentUser();
  }, [loggedIn.loggedIn]);

  useEffect(() => {
    console.log('loginForm');
    console.log(loggedIn.loggedIn);
  }, [loggedIn.loggedIn]);

  return (
    <form
      className={styles.form}
      onSubmit={model.isSignUp ? model.handleRegister : model.handleLogin}
    >
      <ul className={styles.form__links}>
        <Link
          to={`/signin`}
          className={
            !model.isSignUp
              ? styles.form__links_activeLinkItem
              : styles.form__links_linkItem
          }
        >
          Вход
        </Link>
        <Link
          to={`/signup`}
          className={
            model.isSignUp
              ? styles.form__links_activeLinkItem
              : styles.form__links_linkItem
          }
        >
          Регистрация
        </Link>
      </ul>
      {model.isSignUp && (
        <Input
          className={styles.form__input}
          type='text'
          name='username'
          value={model.username}
          label='Придумайте логин'
          isLabelHintHidden={true}
          placeholder='Логин'
          required
          error={model.error.username}
          maxLength={12}
          minLength={3}
          onValue={model.handleValue}
        />
      )}
      <Input
        className={styles.form__input}
        type='email'
        name='email'
        value={model.email}
        label={isSignUp ? 'Введите эл.почту' : 'Введите логин или эл.почту'}
        labelHint={isSignUp ? 'И получите письмо с подтверждением' : ''}
        isLabelHintHidden={!isSignUp}
        placeholder='Эл. почта'
        required
        error={model.error.email}
        onValue={model.handleValue}
        maxLength={30}
        minLength={5}
      />
      <Input
        className={styles.form__input}
        type='password'
        name='password'
        value={model.password}
        label={isSignUp ? 'Придумайте пароль' : 'Введите пароль'}
        labelHint={isSignUp ? 'Не менее 5 символов, латинскими буквами' : ''}
        isLabelHintHidden={!isSignUp}
        placeholder='Пароль'
        required
        error={model.error.password}
        onValue={model.handleValue}
        maxLength={12}
        minLength={5}
      />
      {model.isSignUp && (
        <Input
          className={styles.form__input}
          type='password'
          name='confirmPassword'
          value={model.confirmPassword}
          label='Подтвердите пароль'
          isLabelHintHidden={true}
          placeholder='Пароль'
          required
          error={model.error.confirmPassword}
          onValue={model.handleValue}
          maxLength={12}
          minLength={5}
        />
      )}
      {model.isSignUp && (
        <p className={styles.form__text_grey12}>
          Нажимая на кнопку «Продолжить», вы соглашаетесь с&nbsp;
          <span className={styles.form__text_grey12_underline}>
            Условиями пользования Сервисом
          </span>
        </p>
      )}
      <div className={styles.form__textTag}>
        {!model.isSignUp && (
          <label
            className={cn(styles.form__checkbox, styles.form__text_violet14)}
          >
            <input
              className={cn(
                styles.form__checkbox_input,
                styles.form__checkbox_input_signIn,
              )}
              type='checkbox'
            />
            <span className={styles.form__checkbox_visible}></span>
            Запомнить меня
          </label>
        )}
        {!model.isSignUp && (
          <a
            className={styles.form__forgotLink}
            href='src/components/UI/SignInForm#'
          >
            Не помню пароль
          </a>
        )}
      </div>
      <Button
        className={cn(styles.form__button, styles.form__button_submit)}
        type='submit'
        variant='primary'
        disabled={model.isLoading}
      >
        {model.isLoading ? 'Loading' : isSignUp ? 'Продолжить' : 'Войти'}
      </Button>
      <p className={cn(styles.form__text_or, styles.form__text_violet14)}>
        или
      </p>
      <Button
        className={cn(styles.form__button, styles.form__button_yandex)}
        type='submit'
        variant='transparent'
        disabled={model.isLoading}
      >
        {model.isLoading ? 'Loading' : 'Войти с Яндекс ID'}
      </Button>
    </form>
  );
};

export default observer(SignupSigninForm);
