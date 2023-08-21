import {useLocalObservable} from "mobx-react-lite";
import {FormEvent} from "react";
import {useNavigate} from "react-router-dom";

import {api} from "../../utils/constants";
import {headersWithToken as headers} from "../../utils/constants";

import {loggedIn} from "../../models/LoggedIn";

export const useModel = () => {
    const navigate = useNavigate();

    const model = useLocalObservable(() => {
        return {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            isLoading: false,
            error: "",
            message: "",
            refresh: "",
            access: "",
            isModalOpen: false,
            user: {},

            handleValue({name, value}: { name: "username" | "email" | "password" | "confirmPassword"; value: string }) {
                model[name] = value;
            },

            setModalOpen(newModalOpen: boolean) {
                model.isModalOpen = newModalOpen;
            },

            async handleRegister(event: FormEvent<HTMLFormElement>) {
                event.preventDefault();
                try {
                    model.error = "",
                        model.message = "",
                        model.isLoading = true;
                    const response = await api.api.usersCreate({
                        email: model.email,
                        username: model.username,
                        password: model.password,
                    });

                    console.log('ответ получен -', response);

                    if (response) {
                        navigate("/");
                        model.setModalOpen(true);

                        console.log(response);
                    }

                    model.isLoading = false;
                } catch (error) {
                    console.error('Ошибка при получении данных -', error);
                    model.isLoading = false;
                }
            },

             async handleLogin(event: FormEvent<HTMLFormElement>) {
                event.preventDefault();
                try {
                    model.error = "",
                        model.message = "",
                        model.isLoading = true;

                    const response = await api.api.authJwtCreateCreate({
                        username: model.email,
                        password: model.password
                    });
                    console.log('ответ login получен -', response);

                    if (response && response.data.refresh && response.data.access) {
                        model.refresh = response.data.refresh;
                        model.access = response.data.access;
                        localStorage.setItem('accessToken', response.data.access);
                        localStorage.setItem('refreshToken', response.data.refresh);

                        loggedIn.setLoggedInTrue();

                        console.log(loggedIn.loggedIn);
                        navigate("/");
                    }

                    model.isLoading = false;

                } catch (error) {
                    console.error('Ошибка при получении данных -', error);
                    model.isLoading = false;
                }
            },

            async getCurrentUser() {
                try {
                    model.error = "",
                        model.message = "",
                        model.isLoading = true;
                    const response = await api.api.usersMeRetrieve({headers});

                    console.log('ответ user получен -', response);

                    if (response) {
                        model.user = response;
                        console.log(model.user);
                    }

                    model.isLoading = false;
                } catch (error) {
                    console.error('Ошибка при получении данных -', error);
                    model.isLoading = false;
                }
            },
        };
    });

    return model;
};

