import {observer} from 'mobx-react-lite';

import {Input} from '../../components/UI/Input/Input';
import {Button} from '../../components/UI/Button/Button';

import styles from './SignInPage.module.scss';
import {useModel} from './model';

import logo from "../../images/svg/logo.svg";

const SignInPage = () => {
    const model = useModel();

    return (
        <>
            <section className={styles.content}>
                <div className={styles.content__signInContainer}>
                    <img src={logo} alt="Логотип проекта"/>
                    <ul className={styles.content__signInContainer_links}>
                        <a className={styles.content__signInContainer_links_linkItem}
                           href="/signin">Вход</a>
                        <a className={styles.content__signInContainer_links_linkItem}
                           href="/signup">Регистрация</a>
                    </ul>
                    <form className={styles.form}>
                        <Input
                            className={styles.form_input}
                            type="email"
                            name="email"
                            value={model.email}
                            label="Введите электронную почту"
                            placeholder="Электронная почта"
                            required
                            onValue={model.handleEmailChange}
                        />
                        <Input
                            type="password"
                            name="password"
                            value={model.password}
                            label="Введите пароль"
                            placeholder="Пароль"
                            required
                            onValue={model.handlePasswordChange}
                        />
                        <div className={styles.form_textTag}>
                        <label className={styles.form_checkbox}>
                            <input className={styles.form_checkbox_input} type="checkbox"/>
                            Запомнить меня
                        </label>
                        <a className={styles.form_forgotLink} href="#">
                            Не помню пароль
                        </a>
                        </div>
                        <Button
                            className={styles.form_button}
                            type="submit"
                            variant="primary"
                            disabled={model.isLoading}>
                            {model.isLoading ? 'Loading' : 'Войти'}
                        </Button>
                    </form>
                </div>
                <div className={styles.content__picturesContainer}>

                </div>
            </section>
        </>
    );
};

export default observer(SignInPage);
