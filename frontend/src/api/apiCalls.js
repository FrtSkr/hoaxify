import axios from "axios"; // for HTTP request

const baseUrl = '/api/1.0/'
export const signup = body => {
    const url = baseUrl + 'users';
    return axios.post(url, body);
};

export const login = creds => {
    const url = baseUrl + 'auth';
    return axios.post(url, {}, { auth: creds });
}

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
};


export const getUsers = (page = 0, size = 3) => {
    return axios.get(baseUrl + `users?page=${page}&size=${size}`);
}

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
    if (isLoggedIn) {
        axios.defaults.headers['Authorization'] = `Basic ${btoa(username + ":" + password)}`;

    } else {
        delete axios.defaults.headers['Authorization'];
    }
};