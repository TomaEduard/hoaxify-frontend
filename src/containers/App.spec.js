import React, { Component } from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import axios from 'axios';
import configureStore from '../redux/configureStore';

beforeEach(() => {
    localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
})

const setup = (path) => {
    const store = configureStore(false);
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[path]}>
                <App />
            </MemoryRouter>
        </Provider>
    );
};

describe('App', () => {
    
    it('display homepage when url is /', () => {
        const {queryByTestId} = setup('/');
        expect(queryByTestId('homepage')).toBeInTheDocument();
    });

    it('displays LoginPage when url is /login', () => {
        const {container} = setup('/login');
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Login');
    });

    it('displays onyl LoginPage when url is /login', () => {
        const {queryByTestId} = setup('/login');
        expect(queryByTestId('homepage')).not.toBeInTheDocument();
    });

    it('displays UserSignupPage when url is /signup', () => {
        const {container} = setup('/signup');
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Sign Up');
    });
        
    it('display userpage when url is other than /, /login or /signup', () => {
        const {queryByTestId} = setup('/user1');
        expect(queryByTestId('userpage')).toBeInTheDocument();
    });

    it('display topBar when url is /', () => {
        const { container } = setup('/');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument();
    });

    it('display topBar when url is /login', () => {
        const { container } = setup('/login');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument();
    });

    it('display topBar when url is /signup', () => {
        const { container } = setup('/signup');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument();
    });

    it('display topBar when url is /user1', () => {
        const { container } = setup('/user1');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument();
    });

    it('shows the UserSignupPage when clicking signup', () => {
        const { queryByText, container } = setup('/user1');
        const signupLink = queryByText('Sign Up');
        fireEvent.click(signupLink);
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Sign Up');
    });

    it('shows the LoginPage when clicking login', () => {
        const { queryByText, container } = setup('/user1');
        const loginLink = queryByText('Login');
        fireEvent.click(loginLink);
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Login');
    });
    
    it('shows the HomePage when clicking logo', () => {
        const { queryByTestId, queryByText, container } = setup('/user1');
        const logo = container.querySelector('img');
        fireEvent.click(logo);
        expect(queryByTestId('homepage')).toBeInTheDocument();
    });

    it('display My Profile on TopBar after login success', async () => {
        const { queryByPlaceholderText, container, queryByText } = setup('/login');
        const changeEvent = (content) => {
            return {
              target: {
                value: content
              }
            };
        };

        const usernameInput = queryByPlaceholderText('Your username');
        fireEvent.change(usernameInput, changeEvent('user1'));
        const passwordInput = queryByPlaceholderText('Your password');
        fireEvent.change(passwordInput, changeEvent('P4ssword'));
        const button = container.querySelector('button');

        axios.post = jest.fn().mockResolvedValue({
            data: {
                id: 1,
                username: 'user1',
                displayName: 'display1',
                image: 'profile1.png',
            }
        });
        fireEvent.click(button);

        const myProfileLink = await waitForElement(() => queryByText('My Profile'));
        expect(myProfileLink).toBeInTheDocument();
        
    });

    it('saves logged in user data to localStrorage after login success', async () => {
        const { queryByPlaceholderText, container, queryByText } = setup('/login');
        const changeEvent = (content) => {
            return {
              target: {
                value: content
              }
            };
        };

        const usernameInput = queryByPlaceholderText('Your username');
        fireEvent.change(usernameInput, changeEvent('user1'));
        const passwordInput = queryByPlaceholderText('Your password');
        fireEvent.change(passwordInput, changeEvent('P4ssword'));
        const button = container.querySelector('button');

        axios.post = jest.fn().mockResolvedValue({
            data: {
                id: 1,
                username: 'user1',
                displayName: 'display1',
                image: 'profile1.png',
            }
        });
        fireEvent.click(button);

        await waitForElement(() => queryByText('My Profile'));
        const dataInStorage = JSON.parse(localStorage.getItem('hoax-auth'));
        expect(dataInStorage).toEqual({
            id: 1,
            username: 'user1',
            displayName: 'display1',
            image: 'profile1.png',
            password: 'P4ssword',
            isLoggedIn: true
        });
        
    });

    it('display logged in topBar when storage has logged in user data ', () => {
        localStorage.setItem('hoax-auth', JSON.stringify({
            id: 1,
            username: 'user1',
            displayName: 'display1',
            image: 'profile1.png',
            password: 'P4ssword',
            isLoggedIn: true
            }));
        const { queryByText } = setup('/');
        const myProfileLink = queryByText('My Profile');
        expect(myProfileLink).toBeInTheDocument();
    });

    it('set axios authorization with base64encoded user credentials after login success', async () => {
        const changeEvent = (content) => {
            return {
              target: {
                value: content
              }
            };
        };

        const { queryByPlaceholderText, container, queryByText } = setup('/login');
        const usernameInput = queryByPlaceholderText('Your username');
        fireEvent.change(usernameInput, changeEvent('user1'));
        const passwordInput = queryByPlaceholderText('Your password');
        fireEvent.change(passwordInput, changeEvent('P4ssword'));
        const button = container.querySelector('button');

        axios.post = jest.fn().mockResolvedValue({
            data: {
                id: 1,
                username: 'user1',
                displayName: 'display1',
                image: 'profile1.png',
            }
        });
        fireEvent.click(button);

        await waitForElement(() => queryByText('My Profile'));
        const axiosAuthorization = axios.defaults.headers.common['Authorization'];

        const encoded = btoa('user1:P4ssword');
        const expectedAuthorization = `Basic ${encoded}`;
        expect(axiosAuthorization).toBe(expectedAuthorization);
    });

    it('set axios authorization with base65 encoded user credentials when storage has logged in user data', () => {
        localStorage.setItem('hoax-auth', JSON.stringify({
            id: 1,
            username: 'user1',
            displayName: 'display1',
            image: 'profile1.png',
            password: 'P4ssword',
            isLoggedIn: true
        }));

        setup('/');
        const axiosAuthorization = axios.defaults.headers.common['Authorization'];
        const encoded = btoa('user1:P4ssword');
        const expectedAuthorization = `Basic ${encoded}`;
        expect(axiosAuthorization).toBe(expectedAuthorization);
    });

    it('remove axios authorization header when user logout', () => {
        localStorage.setItem('hoax-auth', JSON.stringify({
            id: 1,
            username: 'user1',
            displayName: 'display1',
            image: 'profile1.png',
            password: 'P4ssword',
            isLoggedIn: true
        }));

        const { queryByText } =  setup('/');
        fireEvent.click(queryByText('Logout'));
        const axiosAuthorization = axios.defaults.headers.common['Authorization'];
        expect(axiosAuthorization).toBeFalsy();
    });
});
