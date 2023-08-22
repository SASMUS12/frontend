import {useEffect, useState} from "react";
import {useLocation, Link, useNavigate } from "react-router-dom";
import {observer} from 'mobx-react-lite';

import {Input} from '../UI/Input/Input';
import {Button} from '../UI/Button/Button';

import styles from './SignupSigninForm.module.scss';
import {useModel} from './model';
import cn from "classnames";
import { loggedIn } from '../../models/LoggedIn';

const SignupSigninForm = () => {
    const model = useModel();
    const navigate = useNavigate();

    const location = useLocation();
    const pathName: string = location.pathname;

    const [isSignUp, setSignUp] = useState(true);

    const checkIsSignUp = () => {
        pathName === "/signup"
            ? setSignUp(true)
            : setSignUp(false)
    }

    useEffect(() => {
        checkIsSignUp();
    }, [pathName]);

    useEffect(() => {
        model.getCurrentUser();
    }, [loggedIn.loggedIn]);

    useEffect(() => {
        console.log('loginForm')
        console.log(loggedIn.loggedIn)
    }, [loggedIn.loggedIn]);

    return (
        <form className={styles.form} onSubmit={isSignUp ? model.handleRegister : model.handleLogin}>
            <ul className={styles.form_links}>
                <Link to={`/signin`} className={!isSignUp ? styles.form_links_activeLinkItem : styles.form_links_linkItem}>
                    Вход
                </Link>
                <Link to={`/signup`} className={isSignUp ? styles.form_links_activeLinkItem : styles.form_links_linkItem}>
                    Регистрация
                </Link>
            </ul>
            {isSignUp && (
            <Input
                className={styles.form_input}
                type="text"
                name="username"
                value={model.username}
                label="Введите ваше имя"
                isLabelHintHidden={true}
                placeholder="Имя"
                required
                maxLength={12}
                minLength={3}
                onValue={model.handleValue}
            />
            )}
            <Input
                className={styles.form_input}
                type="email"
                name="email"
                value={model.email}
                label="Введите электронную почту"
                labelHint={isSignUp
                    ? "На почту придет письмо для подтверждения регистрации"
                    : ""
                }
                isLabelHintHidden={!isSignUp}
                placeholder="Электронная почта"
                required
                error={model.error}
                onValue={model.handleValue}
                maxLength={30}
                minLength={5}
            />
            <Input
                className={styles.form_input}
                type="password"
                name="password"
                value={model.password}
                label={isSignUp
                    ? "Придумайте пароль"
                    : "Введите пароль"
                }
                labelHint={isSignUp
                    ? "Не менее 6 символов, латинскими буквами"
                    : ""
                }
                isLabelHintHidden={!isSignUp}
                placeholder="Пароль"
                required
                error={model.error}
                onValue={model.handleValue}
                maxLength={12}
                minLength={5}
            />
            {isSignUp && (
                <Input
                    className={styles.form_input}
                    type="password"
                    name="confirmPassword"
                    value={model.confirmPassword}
                    label="Подтвердите пароль"
                    isLabelHintHidden={true}
                    placeholder="Пароль"
                    required
                    error={model.error}
                    onValue={model.handleValue}
                    maxLength={12}
                    minLength={5}
                />
            )}
            <div className={styles.form_textTag}>
                {isSignUp && (
                    <label className={styles.form_checkbox}>
                        <input
                            className={cn(styles.form_checkbox_input, styles.form_checkbox_input_signUp)}
                            type="checkbox"
                            required
                        />
                        <span className={styles.form_checkbox_visible}></span>
                        <span className={styles.form_checkbox_span_text}>
                            Продолжая, вы соглашаетесь с
                            <span
                                className={styles.form_checkbox_span_text_underline}
                                > Условиями пользования Сервисом</span>
                        </span>
                    </label>
                )}
                {!isSignUp && (
                    <label className={styles.form_checkbox}>
                        <input
                            className={cn(styles.form_checkbox_input, styles.form_checkbox_input_signIn)}
                            type="checkbox"/>
                        <span className={styles.form_checkbox_visible}></span>
                        Запомнить меня
                    </label>
                )}
                {!isSignUp && (
                    <a className={styles.form_forgotLink} href="src/components/UI/SignInForm#">
                        Не помню пароль
                    </a>
                )}
            </div>
            <Button
                className={cn(styles.form_button, isSignUp ? styles.form_button_signUp : styles.form_button_signIn)}
                type="submit"
                variant="primary"
                disabled={model.isLoading}
            >
                {model.isLoading
                    ? 'Loading'
                    : isSignUp
                        ? 'Продолжить'
                        : 'Войти'}
            </Button>
        </form>
    );
};

export default observer(SignupSigninForm);
