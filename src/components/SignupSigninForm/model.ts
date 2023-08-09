import {useLocalObservable} from "mobx-react-lite";
import {FormEvent} from "react";
import {useNavigate} from "react-router-dom";

import {api} from "../../utils/constants";

export const useModel = () => {
    const navigate = useNavigate();

        const model = useLocalObservable(() => {
                    return {
                        isLoading: false,
                        error: "",
                        message: "",
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        isModalOpen: false,
                        isLoggedIn: false,

                        handleUsernameChange({value}: { value: string }) {
                            model.username = value
                        },

                        handleEmailChange({value}: { value: string }) {
                            model.email = value;
                        },

                        handlePasswordChange({value}: { value: string }) {
                            model.password = value;
                        },

                        handleConfirmPasswordChange({value}: { value: string }) {
                            model.confirmPassword = value;
                        },

                        handleOpenModal() {
                            model.isModalOpen = true;
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

                                if (response.data && response.data) {
                                    navigate("/");
                                    model.handleOpenModal();

                                    console.log(response.data);
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
                                    username: model.username,
                                    password: model.password
                                });

                                console.log('ответ получен -', response);

                                if (response.data && response.data) {
                                    console.log(response.data);
                                    model.isLoggedIn = true;
                                }

                                model.isLoading = false;
                            } catch (error) {
                                console.error('Ошибка при получении данных -', error);
                                model.isLoading = false;
                            }
                        }
                    };
                }
            )
        ;

        return model;
    }
;
