import axios from "axios"; // for HTTP request
const enumDomainName = {
    users: 'users',
    auth: 'auth',
    hoaxes: 'hoaxes'

}
const baseUrl = '/api/1.0/'
export const signup = body => {
    const url = baseUrl + enumDomainName.users;
    return axios.post(url, body);
};

export const login = creds => {
    const url = baseUrl + enumDomainName.auth;
    return axios.post(url, {}, { auth: creds });
}

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
};


export const getUsers = (page = 0, size = 3) => {
    return axios.get(baseUrl + `${enumDomainName.users}?page=${page}&size=${size}`);
}

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
    if (isLoggedIn) {
        axios.defaults.headers['Authorization'] = `Basic ${btoa(username + ":" + password)}`;

    } else {
        delete axios.defaults.headers['Authorization'];
    }
};

export const getUser = username => {
    return axios.get(`${baseUrl}${enumDomainName.users}/${username}`);
};

export const updateUser = (username, body) => {
    return axios.put(`${baseUrl}${enumDomainName.users}/${username}`, body);
}

export const postHoax = hoax => {
    return axios.post(`${baseUrl}${enumDomainName.hoaxes}`, hoax);
}

export const getHoaxes = (page = 0) => {
    return axios.get(`${baseUrl}${enumDomainName.hoaxes}?page=` + page);
}