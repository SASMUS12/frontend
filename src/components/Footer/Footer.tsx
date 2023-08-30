import React from "react";
import styles from "./Footer.module.scss";
import logo from "../../images/svg/footerlogo.svg";
import tlg from "../../images/svg/telegram.svg";
import vk from "../../images/svg/vk.svg";
import { Link } from "react-router-dom";

function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__leftColumn}>
          <img src={logo} alt="Логотип проекта" />
          <div className={styles.footer__yearText}>
            <div className={styles.footer__icons}>
              <Link to={`/`}>
                <img src={tlg} alt="Иконка Телеграм" />
              </Link>
              <Link to={`/`}>
                <img src={vk} alt="Иконка ВКонтакте" />
              </Link>
            </div>
            <p>{currentYear}, © Все права защищены</p>
          </div>
        </div>
        <nav className={styles.footer__rightColumn}>
          <div className={styles.footer__textColumn}>
            <a className={styles.footer__link} href="mailto:linguachat@ro.ru">
              <p className={styles.footer__text}>Связаться с нами</p>
            </a>
            <a className={styles.footer__link} href="mailto:linguachat@ro.ru">
              <p className={styles.footer__text}>Сообщить об ошибке</p>
            </a>
          </div>
          <div className={styles.footer__linksColumn}>
            <Link to={`/rules`} className={styles.footer__linkText}>
              <p className={styles.footer__linkText}>Правила сообщества</p>
            </Link>
            <Link to={`/policy`} className={styles.footer__linkText}>
              <p className={styles.footer__linkText}>
                Политика конфиденциальности
              </p>
            </Link>
            <Link to={`/agreement`} className={styles.footer__linkText}>
              <p className={styles.footer__linkText}>
                Пользовательское соглашение
              </p>
            </Link>
            <Link to={`/reviews`} className={styles.footer__linkText}>
              <p className={styles.footer__text}>Отзывы</p>
            </Link>
            <Link to={`/faq`} className={styles.footer__linkText}>
              <p className={styles.footer__text}>FAQ</p>
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
