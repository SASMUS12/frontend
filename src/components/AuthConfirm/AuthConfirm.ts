import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';

import {api} from "../../utils/constants";

const AuthConfirm = () => {
    const [uidParam, setUidParam] = useState("");
    const [tokenParam, setTokenParam] = useState("");

    const getParams = () => {
        const {authPath} = useParams();
        if (authPath !== undefined) {
            setUidParam(authPath.slice(-41, -43));
            setTokenParam(authPath.slice(-44));
        }
    }

    getParams();

    const getAuthConfirm = async () => {
        try {
            console.log('отправка запроса ---');
            const response = await api.api.usersActivationCreate({
                uid: uidParam,
                token: tokenParam
            });
            console.log('ответ получен -', response);

            if (response.data && response.data) {
                console.log(response.data);
            }
        } catch (error) {
            console.error('Ошибка при получении данных -', error);
        }
    };

    useEffect(() => {
        getAuthConfirm();
    }, []);
}

export default AuthConfirm();