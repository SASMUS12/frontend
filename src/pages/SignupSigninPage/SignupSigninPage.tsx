import SignupSigninForm from "../../components/SignupSigninForm/SignupSigninForm"

import styles from './SignupSigninPage.module.scss';

import logo from "../../images/svg/logo.svg";
import PicturesBlock from "../../components/PicturesBlock/PicturesBlock";

const SignupSigninPage = () => {
    return (
        <>
            <section className={styles.content}>
                <div className={styles.content__signInContainer}>
                    <a className={styles.content__signInContainer_logoLink} href="/">
                        <img className={styles.content__signInContainer_logo} src={logo} alt="Логотип проекта"/>
                    </a>
                    <SignupSigninForm />
                </div>
                <div className={styles.content__picturesContainer}>
                    <PicturesBlock />
                </div>
            </section>
        </>
    );
};

export default SignupSigninPage;
