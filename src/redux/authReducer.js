export default function authReducer(state, action) {
    if(!state){
        return {
            id: 0,
            username: '',
            displayName: '',
            image: '',
            password: '',
            isLoggedIn: false,
        }
    }
    return state;
}