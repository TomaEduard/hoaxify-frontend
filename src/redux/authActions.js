import * as apiCalls from '../api/apiCalls';

export const loginSuccess = (loginUserData) => {
    return {
        type: 'login-success',
        payload: loginUserData,
    };
};

export const loginHandler = (credential) => {
    return function (dispatch) {
        // make api request
        return apiCalls.login(credential)
            .then((response) => {
                // send data to redux store (authReducer)
                dispatch(
                    loginSuccess({ 
                    ...response.data,
                    password: credential.password
                    })
                );
            return response;
        });

    };
};

export const loginSuccessFacebook = (loginUserData) => {
    return {
        type: 'login-success-facebook',
        payload: loginUserData,
    };
};

export const loginHandlerFacebook = (credential) => {
    return function (dispatch) {
        // console.log("#2 loginHandlerFacebook : ", credential);
        return apiCalls.loginFacebook(credential)
            .then((response) => {
                // send data to redux store (authReducer)
                dispatch(
                    loginSuccessFacebook({ 
                        ...response.data,
                        password: credential.password
                    })
                );
    
            return response;
        });

    };
};

export const signupHandler = (user) => {
    return function (dispatch) {
        return apiCalls.signup(user).then((response) => {
           return dispatch(loginHandler(user));
        });
    };
};