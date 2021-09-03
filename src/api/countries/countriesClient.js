import baseApiClient from "../baseApiClient";

export const getCountries = filterData => {
    return baseApiClient.get('statistics', { params: filterData });
}