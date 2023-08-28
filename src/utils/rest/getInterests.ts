import {Interest} from "../openapi";
import {api} from "../constants";

export const getInterests = async (): Promise<Interest[]> => {

    const {
        data: {interests},
        error
    } = await api.api.interestsList();

    if (error) {
        throw error;
    }

    if (interests) {
        return interests.map((interest) => ({
            name: interest.name as string,
            sorting: interest.sorting as string,
        }));
    }

    return [];
};
