import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import { UserSignupPage } from './pages/UserSignupPage';

import { LoginPage } from './pages/LoginPage';

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,

    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
