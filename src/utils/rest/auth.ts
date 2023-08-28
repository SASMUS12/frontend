import {loggedIn} from "../../models/LoggedIn";

import {
    TokenObtainPairRequest,
    TokenObtainPair,
    UserRepr,
    Country,
    GenderEnum,
    Goal,
    NullEnum,
    UserLanguage,
} from "../openapi";

import {api, headersWithToken as headers} from "../constants";

export const signInWithEmail = async ({username, password}: TokenObtainPairRequest): Promise<TokenObtainPair | null> => {
    const {
        data: {token},
        error
    } = await api.api.authJwtCreateCreate({
        username: username,
        password: password
    });

    if (error) {
        throw error;
    }

    if (token) {
        localStorage.setItem('accessToken', token.access);
        localStorage.setItem('refreshToken', token.refresh);
        return {
            access: token.access as string,
            refresh: token.refresh as string,
        };
    }

    return null;
};

export const getMe = async (): Promise<UserRepr | null> => {
    const {
        data: {user},
        error
    } = api.api.usersMeRetrieve({headers});

    if (error) {
        throw error;
    }

    if (!user) {
        return null;
    }

    if (user) {
        loggedIn.setLoggedInTrue();
        console.log(loggedIn.loggedIn);

        return {
            username: user.username as string,
            first_name: user.first_name as string,
            avatar: user.avatar as string,
            age: user.age as string,
            slug: user.slug as string | null,
            country: user.country as Country,
            languages: user.languages as UserLanguage[],
            gender: user.gender as GenderEnum | NullEnum | null,
            goals: user.goals as Goal[],
            interests: user.interests as string[],
            about: user.about as string,
            last_activity: user.last_activity as string | null,
            is_online: user.is_online as string,
            gender_is_hidden: user.gender_is_hidden as boolean,
            age_is_hidden: user.age_is_hidden as boolean,
            role: user.role as string
        };
    }

    return null;
};


// export const signOut = async (): Promise<void> => {
//     const {error} = await api.api.signOut();
//
//     if (error) {
//         throw  error;
//     }
//
// };

