import axios from "axios"; // for HTTP request

export const signup = (body) => {
    const url = '/api/1.0/users';
    return axios.post(url, body);
};


export const changeLanguage = language => {
    console.log(language);
    axios.defaults.headers['accept-language'] = language;
};