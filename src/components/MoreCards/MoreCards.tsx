import {FC, useEffect} from "react";

import {Button} from "../UI/Button/Button";

import styles from './MoreCards.module.scss';


interface IMoreCards {
    cardsList: any[];
    cardsListLength: number;
    setCardsListLength: any;
}

const MoreCards: FC<IMoreCards> = ({cardsList, cardsListLength, setCardsListLength}) => {
    const windowWidth = window.innerWidth;

    const quantity_WW_1200 = 16;
    const quantity_add_WW_1200 = 4;


    function setInitialCardsListLength() {
        if (windowWidth >= 1200) {
            setCardsListLength(quantity_WW_1200);
        }
        return;
    }

    function addMoreMoviesCards() {
        let i;
        if (windowWidth >= 1200) {
            i = quantity_WW_1200;
            if (cardsList.length > i) {
                setCardsListLength(cardsListLength + quantity_add_WW_1200);
            }
        }
        return;
    }

    function handleClick() {
        addMoreMoviesCards();
    }

    useEffect(() => {
        setInitialCardsListLength();
    }, [windowWidth]);

    return (
        <Button
            className={styles.moreCardsButton}
            type="button"
            onClick={handleClick}
            variant="transparent"
        >
            Продолжить искать
        </Button>
    );
}

export default MoreCards;
