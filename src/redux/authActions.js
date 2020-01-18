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
        return apiCalls.login(credential).then(response => {
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