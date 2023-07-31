import {useLocation} from "react-router-dom";
import {observer} from 'mobx-react-lite';

import SignUpAndSignInForm from "../../components/SignUpAndSignInForm/SignUpAndSignInForm"

import styles from './SignUpAndSignInPages.module.scss';
import {useModel} from './model';

import logo from "../../images/svg/logo.svg";

const SignUpAndSignInPages = () => {
    const model = useModel();

    const location = useLocation();
    const pathName = location.pathname;

    return (
        <>
            <section className={styles.content}>
                <div className={styles.content__signInContainer}>
                    <a className={styles.content__signInContainer_logoLink} href="/">
                        <img className={styles.content__signInContainer_logo} src={logo} alt="Логотип проекта"/>
                    </a>
                    <ul className={styles.content__signInContainer_links}>
                        <a className={styles.content__signInContainer_links_linkItem}
                           href="/signin">Вход</a>
                        <a className={styles.content__signInContainer_links_linkItem}
                           href="/signup">Регистрация</a>
                    </ul>
                    <SignUpAndSignInForm />
                </div>
                <div className={styles.content__picturesContainer}>

                </div>
            </section>
        </>
    );
};

export default observer(SignUpAndSignInPages);
