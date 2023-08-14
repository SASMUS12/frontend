import {useLocalObservable} from "mobx-react-lite";
import {FormEvent} from "react";
import {useNavigate} from "react-router-dom";
import { runInAction, makeAutoObservable } from "mobx"

import { api } from "../../utils/constants";
import { headersWithToken as headers } from "../../utils/constants";

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
                        user: {},

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

                        handleLoggedInTrue() {
                            model.isLoggedIn = true;
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
                                    model.handleOpenModal();

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
                                    model.isLoggedIn = true;
                                    console.log(model.isLoggedIn);
                                    navigate("/");
                                }
                                runInAction(() => {
                                    model.isLoggedIn = true;
                                  })

                                
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

                                if (response ) {
                                    model.user = response;
                                    console.log(model.user);
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
