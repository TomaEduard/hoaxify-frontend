const initialState = {
    id: 0,
    username: '',
    displayName: '',
    image: '',
    password: '',
    isLoggedIn: false,
    emailVerificationStatus: false
};

export default function authReducer(state = initialState, action) {
    if(action.type === 'logout-success') {
        return { ...initialState };
    } else if (action.type === 'login-success') {
        return {
            ...action.payload,
            isLoggedIn: true, // not sent from backend and not receive from logginPage isLoggedIn
        };
    } else if (action.type === 'update-success') {
        return {
            ...state,
            displayName: action.payload.displayName,
            image: action.payload.image
        }
    }
    return state;
}