import {TokenObtainPairRequest} from "../openapi";

import {TokenRefresh} from "../openapi";
import {TokenRefreshRequest} from "../openapi";
import {UserCreateRequest} from "../openapi";
import {UserRepr} from "../openapi";

import {api, headersWithToken as headers} from "../constants";

export type Email = string;
export type Password = string;

export interface Tokens {
    access: string;
    refresh: string;
}

export const TokenObtain = async ({
        email, password
    }: { email: Email; password: Password }): Promise<Tokens | null> => {

    const {
        data: {token},
        error
    } = await api.api.authJwtCreateCreate({
        username: email,
        password: password
    });

    if (error) {
        throw error;
    }

    if (token) {
        return {
            access: token.access as string,
            refresh: token.refresh as string,
        };
    }

    return null;
};

export const signInWithEmail = async (): Promise<Tokens | null> => {
const {
    data: {user},
    loginError
} = api.api.usersMeRetrieve({headers});

if (loginError) {
    throw loginError;
}

    if (user) {
        return {
            access: token.access as string,
            refresh: token.refresh as string,
        };
    }

    return null;
};


export const signOut = async (): Promise<void> => {
    const {error} = await client.auth.signOut();

    if (error) {
        throw  error;
    }

};

export const getMe = async (): Promise<User | null> => {
    const {
        data: {session},
        error,
    } = await client.auth.getSession();

    if (error) {
        throw error;
    }

    if (!session) {
        return null;
    }

    const {user} = session;

    return {
        id: user.id as string,
        email: user.email as string,
        firstName: user.user_metadata.first_name || null,
        lastName: user.user_metadata.last_name || null,
    };
};
