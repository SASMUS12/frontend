import { observer } from "mobx-react-lite";

import { Input } from "../../shared/ui/Input";
import { Button } from "../../shared/ui/Button";

import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

import styles from "./styles.module.css";
import { useModel } from "./model";

import logo from "../../shared/svg//logo.svg";
import googleLogo from "../../shared/svg/logo-google.svg";
import yandexLogo from "../../shared/svg/logo-yandex.svg";
import weiboLogo from "../../shared/svg/logo-weibo.svg";

const MainPage = () => {
  const model = useModel();

  return (
    <>
      <header className={styles.header}>
          <img src={logo} alt="Логотип проекта"/>
          <Button
              type="submit"
              variant="primary"
              size="s"
              disabled={model.isLoading}
          >
              {model.isLoading ? "Loading" : "Регистрация"}
          </Button>
      </header>
      <main className={styles.content}>
      </main>
    </>
  );
};

export default observer(MainPage);
