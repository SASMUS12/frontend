import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import SignupSigninForm from "../../components/SignupSigninForm/SignupSigninForm";
import PicturesBlock from "../../components/PicturesBlock/PicturesBlock";

import logo from "../../images/svg/logo.svg";

import styles from "./SignupSigninPage.module.scss";

const SignupSigninPage = () => {
  return (
    <>
      <section className={styles.content}>
        <div className={styles.content__signInContainer}>
          <Link to={`/`} className={styles.content__signInContainer_logoLink}>
            <img
              src={logo}
              className={styles.content__signInContainer_logo}
              alt="Логотип проекта"
            />
          </Link>
          <div className={styles.content__formArea}>
            <SignupSigninForm />
          </div>
        </div>
        <div className={styles.content__picturesContainer}>
          <PicturesBlock />
        </div>
      </section>
    </>
  );
};

export default observer(SignupSigninPage);
