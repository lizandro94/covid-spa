import baseApiClient from "../baseApiClient";

export const getCountries = () => {
    return baseApiClient.get('statistics');
}