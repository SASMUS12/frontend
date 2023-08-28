import SignupSigninForm from "../../components/SignupSigninForm/SignupSigninForm"

import styles from './SignupSigninPage.module.scss';

import logo from "../../images/svg/logo.svg";
import PicturesBlock from "../../components/PicturesBlock/PicturesBlock";
import { Link } from 'react-router-dom';
import {observer} from "mobx-react-lite";

const SignupSigninPage = () => {
    return (
        <>
            <section className={styles.content}>
                <div className={styles.content__signInContainer}>
                    <Link to={`/`} className={styles.content__signInContainer_logoLink}>
                        <img src={logo} className={styles.content__signInContainer_logo} alt="Логотип проекта" />
                    </Link>
                    <SignupSigninForm />
                </div>
                <div className={styles.content__picturesContainer}>
                    <PicturesBlock />
                </div>
            </section>
        </>
    );
};

export default observer(SignupSigninPage);
