import {useLocalObservable} from "mobx-react-lite";

export const useModel = () => {

    const model = useLocalObservable(() => {

        return {
            firstName: "",
            birthdate: "",
            country: "",
            interest: "",
            about: "",
            isLoading: false,

            handleValue({name, value}: { name: "firstName" | "country" | "interest" | "about"; value: string }) {
                model[name] = value;
            },

            // handleBirthdate({name, value}: { name: "birthdate"; value: string }) {
            //     model[name] = value;
            // },
        };
    });

    return model;
};
