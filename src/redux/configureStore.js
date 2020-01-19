
import { createStore, applyMiddleware } from 'redux'; // applyMiddleware optional for consol.log
import authReducer from './authReducer';
import logger from 'redux-logger'; //optional for consol.log
import thunk from 'redux-thunk';
import * as apiCalls from '../api/apiCalls';

const configureStore = (addLogger = true) => {

    let localStorageData = localStorage.getItem('hoax-auth');

    let persistedState = {
        id: 0,
        username: '',
        displayName: '',
        image: '',
        password: '',
        isLoggedIn: false
    };
    if (localStorageData) {
        try {
            persistedState = JSON.parse(localStorageData);
            apiCalls.setAuthorizationHeader(persistedState);
        } catch (error) {

        }
    }

    // if addLogger =  true add additional logger
    const middleware = addLogger ? applyMiddleware(thunk, logger) : applyMiddleware(thunk)
    const store = createStore(authReducer, persistedState, middleware);

    // this will be call whenever anything change in the redux store(authReducer)
    // save the current store in local storage
    store.subscribe(() => {
        localStorage.setItem('hoax-auth', JSON.stringify(store.getState()));
        apiCalls.setAuthorizationHeader(store.getState());
    })

    return store;
};

export default configureStore;