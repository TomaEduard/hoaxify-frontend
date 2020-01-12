import React from 'react';
import { render, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserSignupPage } from './UserSignupPage';
import { exportAllDeclaration, jsxEmptyExpression } from '@babel/types';

// beforEach(cleanup);

describe('UserSignupPage', () => {
    
    describe('Layout', () => {

        it('has header of Sign up', () => {
            const { container } = render(<UserSignupPage />)
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up')
        });

        it('has input for display name', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage />)
            const displayNameInput = queryByPlaceholderText('Your display name');
            expect(displayNameInput).toBeInTheDocument();
        })

        it('has input for username', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage />)
            const username = queryByPlaceholderText('Your username');
            expect(username).toBeInTheDocument();
        })
        
        it('has input for password', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage />)
            const password = queryByPlaceholderText('Your password');
            expect(password).toBeInTheDocument();
        })

        it('has password type for password input', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage />)
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput.type).toBe('password');
        })

        it('has input for password repeat', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage />)
            const passwordRepeat = queryByPlaceholderText('Repeat your password');
            expect(passwordRepeat).toBeInTheDocument();
        })

        it('has password type for password repeat input', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage />)
            const passwordRepeat = queryByPlaceholderText('Repeat your password');
            expect(passwordRepeat.type).toBe('password');
        })

        it('has submit button', () => {
            const { container } = render(<UserSignupPage />);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        })
    });

    describe('Interation', () => {

        const changeEvent = (content) => {
            return {
                target: {
                value: content
                }
            }
        }

        let button, displayNameInput, usernameInput, passwordInput, passwordRepeatInput;

        const setupForSubmit = (props) => {
            const rendered = render(<UserSignupPage {...props}/>);

            const {container, queryByPlaceholderText} = rendered;

            displayNameInput = queryByPlaceholderText('Your display name');
            usernameInput = queryByPlaceholderText('Your username');
            passwordInput = queryByPlaceholderText('Your password');
            passwordRepeatInput = queryByPlaceholderText('Repeat your password');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            fireEvent.change(usernameInput, changeEvent('my-username-name'));
            fireEvent.change(passwordInput, changeEvent('my-password-name'));
            fireEvent.change(passwordRepeatInput, changeEvent('my-passwordRepeat-name'));

            button = container.querySelector('button');

            return rendered;
        }

        it('sets the displayName value intro state', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage />)
            const displayNameInput = queryByPlaceholderText('Your display name');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));

            expect(displayNameInput).toHaveValue('my-display-name')
        })

        
        it('sets the username value intro state', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage />)
            const displayUsername = queryByPlaceholderText('Your username');

            fireEvent.change(displayUsername, changeEvent('my-username-name'));

            expect(displayUsername).toHaveValue('my-username-name')
        })


        it('sets the password value intro state', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage />)
            const displayPassword = queryByPlaceholderText('Your password');

            fireEvent.change(displayPassword, changeEvent('my-password-name'));

            expect(displayPassword).toHaveValue('my-password-name')
        })

        it('sets the password repeat value intro state', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage />)
            const passwordRepeat = queryByPlaceholderText('Your password');

            fireEvent.change(passwordRepeat, changeEvent('my-passwordRepeat-name'));

            expect(passwordRepeat).toHaveValue('my-passwordRepeat-name')
        })

        it('calls postSingup when the fields are valid and the actiions are provided in props', () => {
            const actions = {
                postSingup: jest.fn().mockResolvedValueOnce({})
            }

            setupForSubmit({actions});
            
            fireEvent.click(button);
            expect(actions.postSingup).toHaveBeenCalledTimes(1);
        })

        it('does not throw exception when clicking the button when action not rpovided in props', () => {
            setupForSubmit({});

            expect(() => fireEvent.click(button)).not.toThrow();
        })

        // it('calls post with user body when the fields are valid', () => {
        //     const expectedUserObject = {
        //         username: 'my-display-name',
        //         usernameInput: 'my-username-name',
        //         passwordInput: 'my-password-name',
        //     }

        //     setupForSubmit({actions});
            
        //     fireEvent.click(button);
        //     expect(actions.postSingup).toHaveBeenCalledTimes(1);
        //     expect(actions.postSingup).toHaveBeenCalledWith(expectedUserObject);
        // })

    })
});