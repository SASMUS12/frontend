//import React, { useEffect } from 'react';
import styles from "./Header.module.css";
//import { NavLink, useLocation, Link, useNavigate } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/Button";
import { useModel } from "./model";
import logo from "../../images/svg/logo.svg";

const Header = () => {

  const model = useModel();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <img src={logo} alt="Логотип проекта"/>
      <Button
        className={styles.button}
        type="submit"
        variant="primary"
        size="s"
        disabled={model.isLoading}
        onClick={(e: any)=>navigate('/signup')}
      >
        {model.isLoading ? "Loading" : "Регистрация"}
      </Button>
    </header>
  );
}

export default Header;
