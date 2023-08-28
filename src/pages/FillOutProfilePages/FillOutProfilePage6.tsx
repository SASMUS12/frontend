import {FormEvent} from "react";
import {useNavigate} from "react-router-dom";

import Header from "../../components/Header/Header";
import ProgressLine from "../../components/UI/ProgressLine/ProgressLine";
import {Button} from "../../components/UI/Button/Button";
import {Textarea} from "../../components/UI/Textarea/Textarea";

import {useModel} from "./model";

import styles from "./FillOutProfilePages.module.scss";
import {observer} from "mobx-react-lite";

const FillOutProfilePage6 = () => {
    const model = useModel();
    const navigate = useNavigate();

    console.log(model.about);

    const handleReturnButtonClick = () => {
        navigate("/fill-out-5");
    }

    const handleFillOutPage6 = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate("/");
        console.log("FillOutPage6");
    };

    return (
        <>
            <Header/>
            <main className={styles.content}>
                <button className={styles.content__returnButton}
                        onClick={handleReturnButtonClick}>Назад
                </button>
                <div className={styles.container}>
                    <ProgressLine pageNumber={6}/>
                    <h1 className={styles.container__title}>Расскажите о себе</h1>
                    <form className={styles.form} onSubmit={handleFillOutPage6}>
                        <Textarea
                            className={styles.form__textarea}
                            name="about"
                            value={model.about}
                            placeholder="Напишите несколько предложений о себе, чтобы вас могли найти партнеры со схожими интересами или стилем жизни"
                            required
                            onValue={model.handleValue}
                        >
                            {model.about}
                        </Textarea>
                        <Button
                            className={styles.form__button}
                            type="submit"
                            variant="primary"
                            disabled={false}
                        >
                            Готово
                        </Button>
                    </form>
                </div>
            </main>
        </>
    );
};

export default observer(FillOutProfilePage6);
