import axios from "axios"
import config from "../assets/config";

const baseApiClient = axios.create({
    baseURL: config.apiUrl,
});

export const registerDefaults = () => {
    baseApiClient.defaults.headers.common['x-rapidapi-host'] = `covid-193.p.rapidapi.com`;
    // api-key should be empty for security in real projects
    baseApiClient.defaults.headers.common['x-rapidapi-key'] = `f2c6b9c8d1mshe9a115558dcf169p13b388jsn88e8804554eb`;
}

registerDefaults();

baseApiClient.interceptors.response.use((response) => {
    // Return directly the data no need to check status code here
    // This help not having to do response.data everytime.
    return response.data;
}, (error) => {

    return Promise.reject(error);
});

export default baseApiClient