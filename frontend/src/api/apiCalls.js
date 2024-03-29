import axios from "axios"; // for HTTP request
export const enumDomainName = {
    users: 'users',
    auth: 'auth',
    hoaxes: 'hoaxes'

}
const baseUrl = '/api/1.0/';
export const signup = body => {
    const url = baseUrl + enumDomainName.users;
    return axios.post(url, body);
};

export const login = creds => {
    const url = baseUrl + enumDomainName.auth;
    return axios.post(url, creds);
}

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
};


export const getUsers = (page = 0, size = 3) => {
    return axios.get(baseUrl + `${enumDomainName.users}?page=${page}&size=${size}`);
}

export const setAuthorizationHeader = ({ isLoggedIn, token }) => {
    if (isLoggedIn) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;

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

export const getHoaxes = (username, page = 0) => {
    const path = username ? `${baseUrl}${enumDomainName.users}/${username}/${enumDomainName.hoaxes}?page=${page}`
        : `${baseUrl}${enumDomainName.hoaxes}?page=${page}`;
    return axios.get(path);
}

export const getOldHoaxes = (id, username) => {
    const path = username ? `${baseUrl}${enumDomainName.users}/${username}/${enumDomainName.hoaxes}/${id}`
        : `${baseUrl}${enumDomainName.hoaxes}/${id}`
    return axios.get(path);
}

export const getNewHoaxCount = (id, username) => {
    const path = username ? `${baseUrl}${enumDomainName.users}/${username}/${enumDomainName.hoaxes}/${id}?count=true`
        : `${baseUrl}${enumDomainName.hoaxes}/${id}?count=true`;
    return axios.get(path);
}

export const getNewHoaxes = (id, username) => {
    const path = username ? `${baseUrl}${enumDomainName.users}/${username}/${enumDomainName.hoaxes}/${id}?direction=after`
        : `${baseUrl}${enumDomainName.hoaxes}/${id}?direction=after`;
    return axios.get(path);
}

export const postHoaxAttachment = attachment => {
    return axios.post(`${baseUrl}hoax-attachments`, attachment);
}

export const deleteHoax = id => {
    return axios.delete(`${baseUrl}${enumDomainName.hoaxes}/${id}`);
}

export const deleteUser = username => {
    return axios.delete(`${baseUrl}${enumDomainName.users}/${username}`);
}

export const logout = () => {
    return axios.post(`${baseUrl}logout`);
}