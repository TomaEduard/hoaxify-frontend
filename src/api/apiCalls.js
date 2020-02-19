import axios from 'axios';

export const signup = (user) => {
    return axios.post('/api/1.0/users', user);
};

export const login = (user) => {
    return axios.post('/api/1.0/login', {}, {auth: user});
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
    const path = `/api/1.0/users?page=${param.page || 0}&size=${param.size || 3}`;
    return axios.get(path);
};

export const getUser = (username) => {
    return axios.get(`/api/1.0/users/${username}`);
};

export const updateUser = (userId, body) => {
    return axios.put('/api/1.0/users/' + userId, body);
};

export const postHoax = (hoax) => {
    return axios.post('/api/1.0/hoaxes', hoax);
};

export const loadHoaxes = (username) => {
    const basePath = username ? `/api/1.0/users/${username}/hoaxes` : '/api/1.0/hoaxes'
    return axios.get(basePath + '?page=0&size=5&sort=id,desc')
};

export const loadOldHoaxes = (hoaxId, username) => {
    const basePath = username 
    ? `/api/1.0/users/${username}/hoaxes` 
    : '/api/1.0/hoaxes'

    const path =  `${basePath}/${hoaxId}?direction=before?page=0&size=5&sort=id,desc`;
    return axios.get(path);
};

export const loadNewHoaxes = (hoaxId, username) => {
    const basePath = username 
    ? `/api/1.0/users/${username}/hoaxes` 
    : '/api/1.0/hoaxes'

    const path =  `${basePath}/${hoaxId}?direction=after&sort=id,desc`;
    return axios.get(path);
};

export const loadNewHoaxCount = (hoaxId, username) => {
    const basePath = username 
    ? `/api/1.0/users/${username}/hoaxes` 
    : '/api/1.0/hoaxes'

    const path =  `${basePath}/${hoaxId}?direction=after&count=true`;
    return axios.get(path);
};

export const postHoaxFile = (file) => {
    return axios.post('/api/1.0/hoaxes/upload', file);
};

export const deleteHoax = (hoaxId) => {
    return axios.delete('/api/1.0/hoaxes/' + hoaxId);
};

export const setPreference = (hoaxId, file) => {
    return axios.post('/api/1.0/preference/' + hoaxId , file);
};

// email-verification: generate token for email verification
export const resendEmailVerification = (id) => {
    return axios.post(`/api/1.0/users/email-verification/confirmation/${id}`);
};

// http://localhost:3000/#/verification/email_verification?token=$tokenValue
// confirm token
export const confirmationToken = (token) => {
    return axios.get(`/api/1.0/users/email-verification/confirmationToken/${token}`);
};

// changeEmail generate token
export const changeEmail = (id) => {
    return axios.post(`/api/1.0/users/email-verification/changeEmail/${id}`);
};

// confirm token + body
// http://www.localhost:8080/api/1.0/users/email-verification/changeEmailToken/ TOKEN AICI 
export const saveChangeEmail = (token, file) => {
    console.log("--------------- newEmail => ", token);
    console.log("--------------- newEmail ", file);

    const daaaaa = file
    console.log("--------xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx------- newEmail ", file);

    // return axios.get(path , file);
    return axios.post('api/1.0/users/email-verification/changeEmailToken/' + token , file);

};
