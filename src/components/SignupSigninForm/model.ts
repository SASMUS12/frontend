import {useLocalObservable} from "mobx-react-lite";
import {FormEvent} from "react";
import {useNavigate} from "react-router-dom";
import { runInAction, makeAutoObservable } from "mobx"

import { api } from "../../utils/constants";
import { headersWithToken as headers } from "../../utils/constants";
import { loggedIn } from '../../models/loggedIn';

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
                        //isLoggedIn: false,
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
                            //model.isLoggedIn = true;
                            loggedIn.setLoggedInTrue();
                        },

                        handleLoggedInFalse() {
                            //model.isLoggedIn = false;
                            loggedIn.setLoggedInFalse();
                        },

                        handleLoadingTrue() {
                            model.isLoading = true;
                        },

                        handleLoadingFalse() {
                            model.isLoading = false;
                        },

                        handleLogOut() {
                            model.error = "";
                            model.message = "";
                            model.username = "";
                            model.email = "";
                            model.password = "";
                            model.confirmPassword = "";
                            model.isModalOpen = false;
                            //model.isLoggedIn = false;
                            loggedIn.setLoggedInFalse();
                            model.user = {};
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

                                model.handleLoadingFalse();
                            } catch (error) {
                                console.error('Ошибка при получении данных -', error);
                                model.handleLoadingFalse();
                            }
                        },

                        async handleLogin(event: FormEvent<HTMLFormElement>) {
                            event.preventDefault();
                            try {
                                model.error = "",
                                    model.message = "",
                                    model.handleLoadingTrue();
                                    console.log('try')
                                const response = await api.api.authJwtCreateCreate({
                                    username: model.email,
                                    password: model.password
                                });
                                console.log('ответ login получен -', response);

                                if (response && response.data.refresh && response.data.access) {
                                    localStorage.setItem('accessToken', response.data.access);
                                    localStorage.setItem('refreshToken', response.data.refresh);
                                    model.handleLoggedInTrue();
                                    console.log(loggedIn);
                                    navigate("/");
                                }
                                runInAction(() => {
                                    model.handleLoggedInTrue();
                                  })

                                
                            } catch (error) {
                                console.error('Ошибка при получении данных -', error);
                                model.handleLoadingFalse();
                            }
                        },

                        async getCurrentUser() {
                            try {
                                model.error = "",
                                    model.message = "",
                                    model.handleLoadingTrue();
                                const response = await api.api.usersMeRetrieve({headers});

                                console.log('ответ user получен -', response);

                                if (response ) {
                                    model.user = response.data;
                                    console.log('response!!!');
                                    model.handleLoggedInTrue();
                                    console.log(loggedIn);
                                    console.log(model.user);
                                }


                                model.handleLoadingFalse();
                            } catch (error) {
                                console.error('Ошибка при получении данных -', error);
                                model.handleLoadingFalse();
                            }
                        }
                    };
                }
            )
        ;

        return model;
    }
;