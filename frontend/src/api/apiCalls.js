import axios from "axios";

export const signup = (body) => {
    const url = '/api/1.0/users';
    return axios.post(url, body);
};