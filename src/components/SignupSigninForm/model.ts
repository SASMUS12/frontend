import {FormEvent} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useLocalObservable} from "mobx-react-lite";

import {getMe, signInWithEmail} from "../../utils/rest/auth";
import {signUp} from "../../utils/rest/register";

export const useModel = () => {
    const model = useLocalObservable(() => {
        const navigate = useNavigate();

        const location = useLocation();
        const pathName: string = location.pathname;

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
            isSignUp: false,

            handleValue({name, value}: { name: "username" | "email" | "password" | "confirmPassword"; value: string }) {
                model[name] = value;
            },

            get toMain(): string {
                return "/";
            },

            get toFillOut(): string {
                return "fill-out-1";
            },

            async handleRegister(event: FormEvent<HTMLFormElement>) {
                event.preventDefault();

                model.error = "";
                model.message = "";
                model.isLoading = true;

                await signUp({
                    email: model.email,
                    username: model.username,
                    password: model.password,
                });

                // navigate(model.toFillOut);
                model.isLoading = false;
            },

            async handleLogin(event: FormEvent<HTMLFormElement>) {
                event.preventDefault();

                model.error = "";
                model.message = "";
                model.isLoading = true;

                await signInWithEmail({username: model.email, password: model.password});

                model.isLoading = false;
            },

            async getCurrentUser() {
                model.error = "";
                model.message = "";
                model.isLoading = true;

                await getMe();

                // navigate(model.toMain);
                model.isLoading = false;
            },

        };
    });

    return model;
};

