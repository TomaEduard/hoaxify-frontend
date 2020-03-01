import axios from 'axios';
import { API_URL } from '../config';


export const signup = (user) => {
    return axios.post(`${API_URL}/users`, user);
};

export const login = (user) => {
    return axios.post(`${API_URL}/login`, {}, {auth: user});
};

export const setAuthorizationHeader = ({username, password, isLoggedIn}) => {
    if (isLoggedIn) {
        axios.defaults.headers.common['Authorization'] = `Basic ${btoa( username + ':' + password )}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// if call this function without param, the default values is { page: 0, size: 3 }
export const listUsers = (param = { page: 0, size: 3 }) => {
    const path = `${API_URL}/users?page=${param.page || 0}&size=${param.size || 3}`;
    return axios.get(path);
};

export const getUser = (username) => {
    return axios.get(`${API_URL}/users/${username}`);
};

export const updateUser = (userId, body) => {
    return axios.put(`${API_URL}/users/` + userId, body);
};

export const postHoax = (hoax) => {
    return axios.post(`${API_URL}/hoaxes`, hoax);
};

export const loadHoaxes = (username) => {
    console.log('apiCall - loadHoaxes - username - ', username);
    
    const basePath = username ? `${API_URL}/users/${username}/hoaxes` : `${API_URL}/hoaxes`
    return axios.get(basePath + '?page=0&size=5&sort=id,desc')
};

export const loadOldHoaxes = (hoaxId, username) => {
    const basePath = username 
    ? `${API_URL}/users/${username}/hoaxes` 
    : `${API_URL}/hoaxes`

    const path =  `${basePath}/${hoaxId}?direction=before?page=0&size=5&sort=id,desc`;
    return axios.get(path);
};

export const loadNewHoaxes = (hoaxId, username) => {
    const basePath = username 
    ? `${API_URL}/users/${username}/hoaxes` 
    : `${API_URL}/hoaxes`

    const path =  `${basePath}/${hoaxId}?direction=after&sort=id,desc`;
    return axios.get(path);
};

export const loadNewHoaxCount = (hoaxId, username) => {
    const basePath = username ? `${API_URL}/users/${username}/hoaxes` : `${API_URL}/hoaxes`
    const path =  `${basePath}/${hoaxId}?direction=after&count=true`;
    return axios.get(path);
};

export const postHoaxFile = (file) => {
    return axios.post(`${API_URL}/hoaxes/upload`, file);
};

export const deleteHoax = (hoaxId) => {
    return axios.delete(`${API_URL}/hoaxes/` + hoaxId);
};

export const setPreference = (hoaxId, file) => {
    return axios.post(`${API_URL}/preference/` + hoaxId , file);
};

// email-verification: generate token for email verification
export const resendEmailVerification = (id) => {
    return axios.post(`${API_URL}/users/email-verification/confirmation/${id}`);
};

// confirm token
export const confirmationToken = (token) => {
    return axios.get(`${API_URL}/users/email-verification/confirmationToken/${token}`);
};

// changeEmail generate token
export const changeEmail = (id) => {
    return axios.post(`${API_URL}/users/email-verification/changeEmail/${id}`);
};

// confirm token + body
export const saveChangeEmail = (token, file) => {
    return axios.post(`${API_URL}/users/email-verification/changeEmailToken/` + token , file);
};

export const loadHoaxesByPreferences = (id, file) => {
    return axios.post(`${API_URL}/preference/filter/` + id , file)
};