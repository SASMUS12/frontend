import {useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';

// import {api} from "../../utils/constants";

const AuthConfirm = () => {
    const {authPath} = useParams();
    const navigate = useNavigate();

    const getAuthPath = () => {
        if (authPath !== undefined && authPath.slice(0, 51) === 'https://lingvogo.acceleratorpracticum.ru/') {
            console.log(authPath.slice(30));
            return authPath.slice(30);
        }
    }

    const code = getAuthPath();



    // const getAuthConfirm = async () => {
    //     try {
    //         console.log('отправка запроса ---');
    //         const response = await api.api.usersActivationCreate({
    //             uid: uidParam,
    //             token: tokenParam
    //         });
    //         console.log('ответ получен -', response);
    //
    //         if (response.data && response.data) {
    //             console.log(response.data);
    //         }
    //     } catch (error) {
    //         console.error('Ошибка при получении данных -', error);
    //     }
    // };

    return getAuthPath();

}

export default AuthConfirm;
