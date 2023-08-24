import {FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import Header from "../../components/Header/Header";
import ProgressLine from "../../components/UI/ProgressLine/ProgressLine";
import {Input} from "../../components/UI/Input/Input";
import {Button} from "../../components/UI/Button/Button";
import {api} from "../../utils/constants";
import {Interest, PaginatedInterestList} from "../../utils/openapi";

import {useModel} from "./model";

import styles from "./FillOutProfilePages.module.scss";

const FillOutProfilePage5 = () => {
    const model = useModel();
    const navigate = useNavigate();

    const [interestsList, setInterestsList] = useState([]);

    const getInterestsList = async () => {
        try {
            console.log('отправка запроса ---');
            const response = await api.api.interestsList();
            console.log('ответ получен -', response);

            if (response.data && response.data.results) {
                setInterestsList(response.data.results);
                console.log(response.data.results);
            }
        } catch (error) {
            console.error('Ошибка при получении данных -', error);
        }
    };

    useEffect(() => {
        getInterestsList();
    }, []);

    const handleReturnButtonClick = () => {
        navigate("/fill-out-4");
    }

    const handleFillOutPage5 = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate("/fill-out-6");
        console.log("FillOutPage5");
    };

    return (
        <>
            <Header/>
            <main className={styles.content}>
                <button className={styles.content__returnButton}
                        onClick={handleReturnButtonClick}>Назад
                </button>
                <div className={styles.container}>
                    <ProgressLine pageNumber={5}/>
                    <h1 className={styles.container__title}>Укажите ваши интересы</h1>
                    <form className={styles.form} onSubmit={handleFillOutPage5}>
                        <Input
                            className={styles.form__input_fullWidth}
                            type="text"
                            name="interest"
                            value={model.interest}
                            fontSize="16"
                            placeholder="Путешествия"
                            isLabelHintHidden={true}
                            required
                            onValue={model.handleValue}
                        />
                        <div className={styles.interests}>
                            {interestsList &&
                                interestsList.map((interest, index) => (
                                    <button key={index} className={styles.interests__interest}>{interest.name}</button>
                                ))
                            }
                        </div>
                        <Button
                            className={styles.form__button}
                            type="submit"
                            variant="primary"
                            disabled={false}
                        >
                            Продолжить
                        </Button>
                    </form>
                </div>
            </main>
        </>
    );
};

export default FillOutProfilePage5;
