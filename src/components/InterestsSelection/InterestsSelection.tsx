import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";

import InputSearchList from "../InputSearchList/InputSearchList";

import {Interest} from "../../utils/openapi";
import {api} from "../../utils/constants";

const InterestsSelection = ({pageName, onSelectedInterestsChange}) => {
    const [interestsList, setInterestsList] = useState<Interest[]>([]);

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



    return (
        <InputSearchList
            pageName={pageName}
            data="interests"
            dataList={interestsList}
            onSelectedItemsChange={onSelectedInterestsChange}
        />
    );
}

export default observer(InterestsSelection);
