
import { createStore, applyMiddleware } from 'redux'; // applyMiddleware optional for consol.log
import authReducer from './authReducer';
import logger from 'redux-logger'; //optional for consol.log
import thunk from 'redux-thunk';

const configureStore = (addLogger = true) => {
    // if addLogger =  true add additional logger
    const middleware = addLogger ? applyMiddleware(thunk, logger) : applyMiddleware(thunk)
    return createStore(authReducer, middleware);
};

export default configureStore;