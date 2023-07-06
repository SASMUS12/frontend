import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";

import cn from "classnames";

// import { Input } from "@/shared/ui/Input";
// import { Button } from "@/shared/ui/Button";

import styles from "./styles.module.css";
import { useModel } from "./model";

const SignInPage = () => {
  const model = useModel();

  return (
    <>
      <header className={styles.header}>
      </header>
      <main className={styles.content}>
      </main>
    </>
  );
};

export default observer(SignInPage);
