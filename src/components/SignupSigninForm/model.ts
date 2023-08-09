import {useLocalObservable} from "mobx-react-lite";
import {FormEvent, useState} from "react";
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
                        refresh: "",
                        access: "",
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

                        handleCloseModal() {
                            model.isModalOpen = false;
                        },

                        handleOpenModal() {
                            model.isModalOpen = true;
                            console.log(model.isModalOpen);
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
                                    model.isModalOpen = true;

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
                                    username: model.email,
                                    password: model.password
                                });
                                console.log('ответ login получен -', response);

                                if (response && response.data.refresh && response.data.access) {
                                    model.refresh = response.data.refresh;
                                    model.access = response.data.access;
                                    localStorage.setItem('accessToken', response.data.access);
                                    localStorage.setItem('refreshToken', response.data.refresh);
                                    model.isLoggedIn = true;
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
                                const response = await api.api.usersMeRetrieve({
                                });

                                console.log('ответ user получен -', response);

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
